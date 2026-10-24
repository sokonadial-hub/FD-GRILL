(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mobile = window.matchMedia("(max-width: 860px)");

  // ---------- Load sequence ----------
  // Wait for the display font so the headline doesn't reflow mid-animation,
  // but never hold the page longer than a moment.
  var started = false;
  function start() {
    if (started) return;
    started = true;
    requestAnimationFrame(function () { root.classList.add("loaded"); });
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
  setTimeout(start, 600);

  // ---------- Open / closed, in Philadelphia time ----------
  var OPEN = 11 * 60;
  var CLOSE = 19 * 60 + 30;
  var DAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  function phillyNow() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23"
    }).formatToParts(new Date());
    var get = function (t) {
      for (var i = 0; i < parts.length; i++) if (parts[i].type === t) return parts[i].value;
    };
    return { day: DAYS[get("weekday")], minutes: parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10) };
  }

  var now = phillyNow();
  var status = document.getElementById("status");
  if (status) {
    var openDay = now.day !== 0;
    if (openDay && now.minutes >= OPEN && now.minutes < CLOSE) {
      var left = CLOSE - now.minutes;
      status.textContent = left <= 45 ? "Open now. Closing at 7:30pm" : "Open now until 7:30pm";
      status.classList.add("open");
    } else if (openDay && now.minutes < OPEN) {
      status.textContent = "Closed now. Opens today at 11am";
    } else if (now.day === 6 || now.day === 0) {
      status.textContent = "Closed now. Opens Monday at 11am";
    } else {
      status.textContent = "Closed now. Opens tomorrow at 11am";
    }
  }
  var todayRow = document.querySelector('#hours tr[data-day="' + now.day + '"]');
  if (todayRow) todayRow.classList.add("today");

  // ---------- Top bar border once scrolled ----------
  var topbar = document.getElementById("topbar");
  var onScroll = function () { topbar.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Reveals: cloth bands and dish photos ----------
  // Watch each photo's parent: a fully clipped element never counts as visible.
  function reveal(el) {
    if (el.classList.contains("cloth")) el.classList.add("woven");
    else el.querySelectorAll(".reveal").forEach(function (r) { r.classList.add("in"); });
  }
  var revealTargets = document.querySelectorAll(".cloth, .dish");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        revealer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });
    revealTargets.forEach(function (el) { revealer.observe(el); });
  } else {
    revealTargets.forEach(reveal);
  }

  // ---------- Menu: all sections open on wide screens, folding on phones ----------
  var cats = document.querySelectorAll(".cat");
  function syncCats() {
    cats.forEach(function (c, i) {
      if (mobile.matches) c.open = i === 0;
      else c.open = true;
    });
  }
  syncCats();
  if (mobile.addEventListener) mobile.addEventListener("change", syncCats);

  cats.forEach(function (c) {
    c.querySelector("summary").addEventListener("click", function (e) {
      if (!mobile.matches) e.preventDefault();
    });
  });

  // Tabs open the section they point to and follow the reader
  var tabs = document.querySelectorAll(".tabs a");
  var tabFor = {};
  tabs.forEach(function (t) {
    var id = t.getAttribute("href").slice(1);
    tabFor[id] = t;
    t.addEventListener("click", function () {
      var target = document.getElementById(id);
      if (target && target.tagName === "DETAILS") target.open = true;
      if (id === "sides") document.getElementById("drinks").open = true;
    });
  });
  tabFor.drinks = tabFor.sides;

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var tab = tabFor[entry.target.id];
        if (!tab) return;
        tabs.forEach(function (t) { t.classList.toggle("active", t === tab); });
        var bar = tab.parentNode;
        bar.scrollTo({ left: tab.offsetLeft - 16, behavior: reduceMotion ? "auto" : "smooth" });
      });
    }, { rootMargin: "-35% 0px -60% 0px" });
    cats.forEach(function (c) { spy.observe(c); });
  }

  // ---------- Mobile dock: appears once the hero buttons scroll away ----------
  var dock = document.querySelector(".dock");
  var heroActions = document.querySelector(".hero .actions");
  if (dock && heroActions && "IntersectionObserver" in window) {
    dock.classList.add("hidden");
    new IntersectionObserver(function (entries) {
      dock.classList.toggle("hidden", entries[0].isIntersecting);
    }).observe(heroActions);
  }

  // ---------- Map loads only when asked, to keep the page light ----------
  var mapBtn = document.getElementById("map-load");
  if (mapBtn) {
    mapBtn.addEventListener("click", function () {
      var frame = document.createElement("iframe");
      frame.title = "Map showing FD Grill at 6732 Elmwood Ave, Philadelphia";
      frame.src = "https://www.google.com/maps?q=6732+Elmwood+Ave,+Philadelphia,+PA&output=embed";
      frame.loading = "lazy";
      frame.referrerPolicy = "no-referrer-when-downgrade";
      document.getElementById("map").appendChild(frame);
      mapBtn.remove();
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ---------- Embers rising off the grill ----------
  var canvas = document.getElementById("embers");
  if (!canvas || reduceMotion || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w = 0, h = 0, sparks = [], running = false, visible = true, last = 0;

  function size() {
    var r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.round(Math.min(46, Math.max(18, w / 18)));
    while (sparks.length < count) sparks.push(spawn(true));
    sparks.length = count;
  }

  function spawn(anywhere) {
    return {
      x: w * (0.15 + Math.random() * 0.7),
      y: anywhere ? Math.random() * h : h + Math.random() * 20,
      r: 0.8 + Math.random() * 1.8,
      vy: 18 + Math.random() * 38,
      drift: (Math.random() - 0.5) * 14,
      phase: Math.random() * Math.PI * 2,
      life: 0,
      max: 2.2 + Math.random() * 2.8
    };
  }

  function frame(t) {
    if (!running) return;
    var dt = Math.min((t - last) / 1000, 0.05);
    last = t;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0; i < sparks.length; i++) {
      var s = sparks[i];
      s.life += dt;
      s.y -= s.vy * dt;
      s.x += (s.drift + Math.sin(t / 700 + s.phase) * 10) * dt;
      var k = s.life / s.max;
      if (k >= 1 || s.y < -10) { sparks[i] = spawn(false); continue; }
      var alpha = k < 0.15 ? k / 0.15 : 1 - (k - 0.15) / 0.85;
      var g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
      g.addColorStop(0, "rgba(255, 214, 140," + (0.95 * alpha) + ")");
      g.addColorStop(0.35, "rgba(240, 120, 40," + (0.6 * alpha) + ")");
      g.addColorStop(1, "rgba(200, 60, 10, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  function play() {
    var shouldRun = visible && !document.hidden;
    if (shouldRun && !running) {
      running = true;
      last = performance.now();
      requestAnimationFrame(frame);
    } else if (!shouldRun) {
      running = false;
    }
  }

  size();
  window.addEventListener("resize", size);
  document.addEventListener("visibilitychange", play);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      play();
    }).observe(canvas);
  }
  // Let the photo unveil first, then light the coals
  setTimeout(play, 900);
})();
