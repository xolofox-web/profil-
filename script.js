document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi Ikon Lucide
    lucide.createIcons();

    // 2. Logika Tema (Light / Dark Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Cek preferensi user di localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        // Jika tidak ada, cek preferensi sistem operasi
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            htmlElement.setAttribute('data-theme', 'dark');
        }
    }

    // Fungsi Toggle
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 3. Fitur Copy URL Website
    const copyBtn = document.getElementById('copy-btn');
    
    copyBtn.addEventListener('click', () => {
        const currentUrl = window.location.href;
        
        navigator.clipboard.writeText(currentUrl).then(() => {
            // Ubah ikon jadi centang sementara sebagai feedback
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i data-lucide="check"></i>';
            copyBtn.classList.add('success');
            lucide.createIcons();
            
            // Kembalikan ke semula setelah 2 detik
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
                copyBtn.classList.remove('success');
                lucide.createIcons();
            }, 2000);
        }).catch(err => {
            console.error('Gagal menyalin tautan: ', err);
        });
    });

    // 4. Tahun Otomatis di Footer
    document.getElementById('year').textContent = new Date().getFullYear();
});