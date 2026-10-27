document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi Lucide Icons
    lucide.createIcons();

    // 2. Logika Tema (Light / Dark Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Ambil tema dari local storage, default ke 'dark' sesuai gambar referensi
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    // Event Listener Toggle Tema
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 3. Tahun Otomatis di Footer
    document.getElementById('year').textContent = new Date().getFullYear();
});