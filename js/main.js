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

  // ---------- Announcement ticker: pause and play ----------
  var ticker = document.querySelector(".ticker");
  if (ticker) {
    var toggle = ticker.querySelector(".ticker-toggle");
    toggle.addEventListener("click", function () {
      var paused = ticker.classList.toggle("paused");
      toggle.setAttribute("aria-pressed", paused ? "true" : "false");
    });
  }

  // ---------- Top bar border once scrolled ----------
  var topbar = document.getElementById("topbar");
  var onScroll = function () { topbar.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Reveals: cloth bands, photos, the 2027 year ----------
  // Watch each photo's parent: a fully clipped element never counts as visible.
  function reveal(el) {
    if (el.classList.contains("cloth")) el.classList.add("woven");
    else {
      el.classList.add("in");
      el.querySelectorAll(".reveal").forEach(function (r) { r.classList.add("in"); });
    }
  }
  var revealTargets = document.querySelectorAll(".cloth, .story, .dish, .catering-media, .restaurant");
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

  // ---------- Catering quote: emailed to FD Grill through FormSubmit ----------
  // FormSubmit forwards each request to the inbox below. The first request ever
  // sent triggers a one-time activation email that must be confirmed.
  var INBOX = "fdgrillllc@gmail.com";
  var PHONE = "+16102569268";
  var ENDPOINT = "https://formsubmit.co/ajax/" + INBOX;

  var form = document.getElementById("quote-form");
  if (form) {
    var dateInput = document.getElementById("q-date");
    var today = new Date();
    dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

    var required = ["q-name", "q-phone", "q-date", "q-guests"];
    var checked = required.concat(["q-email"]);

    function check(id) {
      var input = document.getElementById(id);
      var err = document.getElementById(id + "-err");
      var empty = input.value.trim() === "";
      var ok = input.required ? !empty && input.checkValidity() : empty || input.checkValidity();
      input.setAttribute("aria-invalid", ok ? "false" : "true");
      if (ok) input.removeAttribute("aria-describedby");
      else input.setAttribute("aria-describedby", id + "-err");
      err.hidden = ok;
      return ok;
    }
    checked.forEach(function (id) {
      var input = document.getElementById(id);
      input.addEventListener("blur", function () {
        if (this.getAttribute("aria-invalid")) check(id);
      });
      input.addEventListener("input", function () {
        if (this.getAttribute("aria-invalid") === "true") check(id);
      });
    });

    function formatDate(value) {
      var d = new Date(value + "T12:00:00");
      return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    }

    function collect() {
      var f = form.elements;
      var foods = Array.prototype.filter.call(form.querySelectorAll('input[name="food"]'), function (c) { return c.checked; })
        .map(function (c) { return c.value; });
      var data = {
        Name: f.name.value.trim(),
        Phone: f.phone.value.trim(),
        Email: f.email.value.trim(),
        "Event date": formatDate(f.date.value),
        Guests: f.guests.value,
        "Type of event": f.type.value,
        Where: f.where.value.trim(),
        Food: foods.join(", "),
        Notes: f.notes.value.trim()
      };
      Object.keys(data).forEach(function (k) { if (!data[k]) delete data[k]; });
      return data;
    }

    function asText(data) {
      return ["Catering request for FD Grill"].concat(Object.keys(data).map(function (k) {
        return k + ": " + data[k];
      })).join("\n");
    }

    var submitBtn = document.getElementById("quote-submit");
    var sentBox = document.getElementById("quote-sent");
    var failBox = document.getElementById("quote-failed");

    function showFailure(data) {
      var text = asText(data);
      document.getElementById("quote-text").value = text;
      document.getElementById("quote-mailto").href = "mailto:" + INBOX +
        "?subject=" + encodeURIComponent("Catering request: " + data["Event date"]) +
        "&body=" + encodeURIComponent(text);
      document.getElementById("quote-sms").href = "sms:" + PHONE + "?&body=" + encodeURIComponent(text);
      failBox.hidden = false;
      failBox.focus();
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.elements._honey.value) return;

      var firstBad = null;
      checked.forEach(function (id) { if (!check(id) && !firstBad) firstBad = id; });
      if (firstBad) { document.getElementById(firstBad).focus(); return; }

      var data = collect();
      var payload = {};
      Object.keys(data).forEach(function (k) { payload[k] = data[k]; });
      payload._subject = "Catering request: " + data.Name + ", " + data["Event date"] + ", " + data.Guests + " guests";
      payload._template = "table";
      payload._captcha = "false";
      if (data.Email) payload._replyto = data.Email;

      sentBox.hidden = true;
      failBox.hidden = true;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json().then(function (body) { return { ok: res.ok, body: body }; }); })
        .then(function (r) {
          if (!r.ok || String(r.body.success) !== "true") throw new Error(r.body.message || "Not sent");
          form.reset();
          checked.forEach(function (id) { document.getElementById(id).removeAttribute("aria-invalid"); });
          sentBox.hidden = false;
          sentBox.focus();
        })
        .catch(function () { showFailure(data); })
        .then(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send request";
        });
    });

    document.getElementById("quote-copy").addEventListener("click", function () {
      var btn = this;
      var text = document.getElementById("quote-text");
      var done = function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = "Copy request"; }, 2000);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text.value).then(done, function () { text.select(); });
      } else {
        text.select();
        try { document.execCommand("copy"); done(); } catch (err) { /* text stays selected for manual copy */ }
      }
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
