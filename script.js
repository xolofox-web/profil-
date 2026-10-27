/* =========================================================
   PERSONAL PROFILE — SCRIPT (v2)
   ========================================================= */

(function () {
  "use strict";

  /* ---------- THEME ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const metaTheme = document.querySelector('meta[name="theme-color"]');

  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(stored || (prefersDark ? "dark" : "light"));

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (metaTheme) {
      metaTheme.setAttribute("content", theme === "dark" ? "#0a0a0a" : "#ffffff");
    }
  }

  themeToggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });

  /* ---------- MOBILE MENU ---------- */
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const links = navLinks ? navLinks.querySelectorAll(".nav-link") : [];

  function closeMenu() {
    navLinks?.classList.remove("open");
    menuBtn?.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
    menuBtn?.setAttribute("aria-label", "Buka menu");
  }

  menuBtn?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.classList.toggle("open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
  });

  links.forEach((l) => l.addEventListener("click", closeMenu));

  document.addEventListener("click", (e) => {
    if (!navLinks?.classList.contains("open")) return;
    if (navLinks.contains(e.target) || menuBtn.contains(e.target)) return;
    closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- NAV SCROLLED ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 6);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- SCROLLSPY ---------- */
  const sections = document.querySelectorAll("section[id]");
  const linkMap = new Map();
  links.forEach((l) => {
    const id = l.getAttribute("href")?.replace("#", "");
    if (id) linkMap.set(id, l);
  });

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((l) => l.classList.remove("active"));
          linkMap.get(entry.target.id)?.classList.add("active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- REVEAL ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
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
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- YEAR ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();