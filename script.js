document.addEventListener("DOMContentLoaded", () => {
  /* ---------- THEME SWITCHER ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  
  // Cek tema tersimpan atau preferensi sistem
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    root.setAttribute("data-theme", storedTheme);
  } else {
    // Jika tidak ada, biarkan default (dark) atau ikuti sistem
    const prefersDark = window.matchMedia("(prefers-color-scheme: light)").matches;
    if (prefersDark) root.setAttribute("data-theme", "light");
  }

  // Aksi tombol toggle
  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });

  /* ---------- AUTO UPDATE TAHUN ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});