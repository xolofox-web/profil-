/* =========================================================
   PERSONAL PROFILE — SCRIPT
   Fitur: theme toggle, mobile menu, scrollspy, reveal on scroll,
          navbar scrolled state, tahun otomatis.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- THEME TOGGLE ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const metaTheme = document.querySelector('meta[name="theme-color"]');

  // Prioritas: localStorage > prefers-color-scheme > light
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
  applyTheme(initialTheme);

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (metaTheme) metaTheme.setAttribute("content", theme === "dark" ? "#0d0f13" : "#ffffff");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("theme", next);
    });
  }

  /* ---------- MOBILE MENU ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = navMenu ? navMenu.querySelectorAll(".nav-link") : [];

  function closeMenu() {
    if (!navMenu || !menuToggle) return;
    navMenu.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu");
  }

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", toggleMenu);

    // Tutup menu ketika klik link
    navLinks.forEach((link) => link.addEventListener("click", closeMenu));

    // Tutup menu ketika klik di luar
    document.addEventListener("click", (e) => {
      if (!navMenu.classList.contains("open")) return;
      if (navMenu.contains(e.target) || menuToggle.contains(e.target)) return;
      closeMenu();
    });

    // Tutup menu saat escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- NAVBAR SCROLLED STATE ---------- */
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- SCROLLSPY (active nav link) ---------- */
  const sections = document.querySelectorAll("section[id]");
  const linkMap = new Map();
  navLinks.forEach((link) => {
    const id = link.getAttribute("href")?.replace("#", "");
    if (id) linkMap.set(id, link);
  });

  if ("IntersectionObserver" in window && sections.length) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((l) => l.classList.remove("active"));
          const active = linkMap.get(id);
          if (active) active.classList.add("active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spyObserver.observe(s));
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: tampilkan semua
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- FOOTER YEAR ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();