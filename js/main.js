// Open/closed status, using the restaurant's local time (Philadelphia).
(function () {
  var el = document.getElementById("status");
  if (!el) return;

  var OPEN = 11 * 60;        // 11:00am
  var CLOSE = 19 * 60 + 30;  // 7:30pm

  var parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23"
  }).formatToParts(new Date());

  var get = function (type) {
    return parts.find(function (p) { return p.type === type; }).value;
  };
  var day = get("weekday");
  var minutes = parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10);
  var isSunday = day === "Sun";

  if (!isSunday && minutes >= OPEN && minutes < CLOSE) {
    el.textContent = "Open now until 7:30pm";
    el.classList.add("open");
  } else if (!isSunday && minutes < OPEN) {
    el.textContent = "Closed now. Opens today at 11am";
  } else if (day === "Sat" || isSunday) {
    el.textContent = "Closed now. Opens Monday at 11am";
  } else {
    el.textContent = "Closed now. Opens tomorrow at 11am";
  }
})();

// Highlight the menu tab for the section in view.
(function () {
  var tabs = document.querySelectorAll(".tabs a");
  if (!tabs.length || !("IntersectionObserver" in window)) return;

  var byId = {};
  tabs.forEach(function (t) { byId[t.getAttribute("href").slice(1)] = t; });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      tabs.forEach(function (t) { t.classList.remove("active"); });
      var tab = byId[entry.target.id];
      tab.classList.add("active");
      tab.scrollIntoView({ block: "nearest", inline: "nearest" });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  Object.keys(byId).forEach(function (id) {
    var section = document.getElementById(id);
    if (section) observer.observe(section);
  });
})();

document.getElementById("year").textContent = new Date().getFullYear();
