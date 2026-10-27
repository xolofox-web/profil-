document.addEventListener("DOMContentLoaded", () => {
  /* ---------- THEME TOGGLE ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  
  // Ambil tema dari local storage atau sistem
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
  
  root.setAttribute("data-theme", initialTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });

  /* ---------- YEAR AUTO UPDATE ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- MUSIC BUTTON INTERACTION (UI Only) ---------- */
  const musicBtn = document.getElementById("musicBtn");
  const playIcon = musicBtn.querySelector(".music-play-icon");
  let isPlaying = false;

  musicBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      playIcon.textContent = "❚❚"; // Ikon pause
      musicBtn.style.borderColor = "var(--accent)";
      musicBtn.style.color = "var(--accent)";
    } else {
      playIcon.textContent = "▶"; // Ikon play
      musicBtn.style.borderColor = "var(--border)";
      musicBtn.style.color = "var(--text-main)";
    }
  });
});