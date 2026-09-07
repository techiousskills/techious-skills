// ============================================================
// TECHIOUS SKILLS: script.js
// Small, dependency-free interactions: a live taskbar clock,
// a Start-Menu style mobile nav, a typed hero line, and a
// scroll reveal for the "window" cards.
// ============================================================

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Live taskbar clock ---------------- */
  function updateClock() {
    var el = document.getElementById("clock");
    if (!el) return;
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var ampm = h >= 12 ? "PM" : "AM";
    var h12 = h % 12 || 12;
    var mm = m < 10 ? "0" + m : m;
    el.textContent = h12 + ":" + mm + " " + ampm;
  }
  updateClock();
  setInterval(updateClock, 15000);

  /* ---------------- Start Menu (mobile nav) ---------------- */
  var menuToggle = document.getElementById("menuToggle");
  var startMenu = document.getElementById("startMenu");

  function openMenu() {
    startMenu.hidden = false;
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    startMenu.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  function toggleMenu() {
    if (startMenu.hidden) openMenu();
    else closeMenu();
  }

  if (menuToggle) menuToggle.addEventListener("click", toggleMenu);
  if (startMenu) {
    startMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && startMenu && !startMenu.hidden) closeMenu();
  });

  /* ---------------- Typed hero line ---------------- */
  var typedEl = document.getElementById("typedLine");
  if (typedEl) {
    var fullText = typedEl.getAttribute("data-text") || typedEl.textContent;
    if (reduceMotion) {
      typedEl.textContent = fullText;
    } else {
      typedEl.textContent = "";
      var cursor = document.createElement("span");
      cursor.className = "typed-cursor";
      cursor.setAttribute("aria-hidden", "true");
      var i = 0;
      function typeNext() {
        if (i <= fullText.length) {
          typedEl.textContent = fullText.slice(0, i);
          typedEl.appendChild(cursor);
          i++;
          setTimeout(typeNext, 28);
        }
      }
      typeNext();
    }
  }

  /* ---------------- Scroll reveal ----------------
     Progressive enhancement: elements are visible by default
     (see CSS). Only once we know we can observe them do we
     mark them "pending" and animate them in, so a slow or
     failed script never leaves content permanently hidden. */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      el.classList.add("reveal-pending");
      io.observe(el);
      // If the element is already in the viewport (above the fold),
      // reveal it right away instead of waiting on a scroll event.
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("is-visible");
        io.unobserve(el);
      }
    });
  }

  /* ---------------- Taskbar shrink on scroll (subtle) ---------------- */
  var taskbar = document.getElementById("taskbar");
  var lastScrolled = false;
  window.addEventListener(
    "scroll",
    function () {
      var scrolled = window.scrollY > 8;
      if (scrolled !== lastScrolled && taskbar) {
        taskbar.style.boxShadow = scrolled
          ? "0 12px 30px -18px rgba(0,0,0,0.6)"
          : "none";
        lastScrolled = scrolled;
      }
    },
    { passive: true }
  );

  /* ---------------- Footer year ---------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Enrollment form (enroll.html only) ----------------
     Static hosting has no server, so "sending" the form works by
     building a pre-filled email (opens the visitor's own email app,
     addressed to Techious Skills) and, as a safety net in case they
     don't have an email app set up, a matching WhatsApp message they
     can send instead. Nothing is silently transmitted anywhere. */
  var enrollForm = document.getElementById("enrollForm");
  if (enrollForm) {
    var ENROLL_EMAIL = "techiousskills26@gmail.com";
    var ENROLL_WHATSAPP = "2347065595741";

    var packageLabels = {
      beginner: "Beginner's Package (₦50,000)",
      advanced: "Advanced Package (₦50,000)",
      bundle: "Both Skills Package (₦75,000)",
      unsure: "Not sure yet"
    };

    // Pre-select the package from ?package=beginner|advanced|bundle
    var params = new URLSearchParams(window.location.search);
    var presetPackage = params.get("package");
    var packageSelect = document.getElementById("fPackage");
    if (presetPackage && packageSelect && packageLabels[presetPackage]) {
      packageSelect.value = presetPackage;
    }

    function currentValues() {
      var fd = new FormData(enrollForm);
      var pkgKey = fd.get("package") || "";
      return {
        name: (fd.get("name") || "").toString().trim(),
        phone: (fd.get("phone") || "").toString().trim(),
        email: (fd.get("email") || "").toString().trim(),
        gender: (fd.get("gender") || "").toString().trim(),
        pkg: packageLabels[pkgKey] || "Not selected yet"
      };
    }

    function buildMailto(v) {
      var subject = "New Enrollment: " + (v.name || "Techious Skills website");
      var body =
        "New enrollment request from the Techious Skills website.\n\n" +
        "Full name: " + v.name + "\n" +
        "Phone number: " + v.phone + "\n" +
        "Email: " + v.email + "\n" +
        "Gender: " + v.gender + "\n" +
        "Package: " + v.pkg + "\n";
      return (
        "mailto:" + ENROLL_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body)
      );
    }

    function buildWhatsApp(v) {
      var text =
        "Hi Techious Skills, I'd like to enroll.\n" +
        "Name: " + (v.name || "-") + "\n" +
        "Phone: " + (v.phone || "-") + "\n" +
        "Email: " + (v.email || "-") + "\n" +
        "Gender: " + (v.gender || "-") + "\n" +
        "Package: " + v.pkg;
      return "https://wa.me/" + ENROLL_WHATSAPP + "?text=" + encodeURIComponent(text);
    }

    var waFallback = document.getElementById("waFallback");
    function refreshWaFallback() {
      if (waFallback) waFallback.href = buildWhatsApp(currentValues());
    }
    enrollForm.addEventListener("input", refreshWaFallback);
    enrollForm.addEventListener("change", refreshWaFallback);
    refreshWaFallback();

    enrollForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = currentValues();
      var status = document.getElementById("enrollStatus");
      if (status) {
        status.hidden = false;
        status.textContent =
          "Opening your email app with your details filled in. If nothing opens, use the WhatsApp option below instead.";
      }
      window.location.href = buildMailto(v);
    });
  }
})();
