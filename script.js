document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi Ikon Lucide
    lucide.createIcons();

    // 2. Logika Tema (Light / Dark Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Default ke dark mode jika belum ada settingan
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    // Fungsi Toggle
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 3. Tahun Otomatis di Footer
    document.getElementById('year').textContent = new Date().getFullYear();
});