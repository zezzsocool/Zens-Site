document.addEventListener('DOMContentLoaded', () => {
    // === 1. SELEKTOR ELEMEN ===
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const modal = document.getElementById('profileModal');
    const closeBtn = document.querySelector('.close-btn');
    const openProfileBtn = document.getElementById('openProfile');
    
    // Audio Elements
    const soundHover = document.getElementById('soundHover');
    const soundClick = document.getElementById('soundClick');

    // === 2. FUNGSI SUARA (KREK-KREK) ===
    const playHover = () => { 
        if(soundHover) { soundHover.currentTime = 0; soundHover.play().catch(()=>{}); } 
    };
    const playClick = () => { 
        if(soundClick) { soundClick.currentTime = 0; soundClick.play().catch(()=>{}); } 
    };

    // === 3. NAVIGASI TITIK TIGA ===
    if(menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            playClick();
            navLinks.style.display = (navLinks.style.display === 'block') ? 'none' : 'block';
        });
    }

    // === 4. LOGIKA MODAL PROFIL (GABUNGAN) ===
    if(openProfileBtn) {
        openProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            playClick();
            if(modal) modal.style.display = 'block';
            if(navLinks) navLinks.style.display = 'none';
        });
    }

    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            playClick();
            modal.style.display = 'none';
        });
    }

    // Klik luar untuk tutup
    window.addEventListener('click', (e) => {
        if (modal && e.target === modal) modal.style.display = 'none';
        if (navLinks && !menuToggle.contains(e.target)) navLinks.style.display = 'none';
    });

    // === 5. ANIMASI TRANSISI MASUK ===
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.add('page-loaded');
        }, 500);
    });

    // === 6. LOGIKA PINDAH HALAMAN (ANTI-NIHIL) ===
    // Kita pakai event delegation supaya lebih kuat mencakup semua link
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        const id = link.id;

        // Jika link adalah pemicu modal atau link kosong, JANGAN interupsi
        if (id === "openProfile" || href === "javascript:void(0)" || href === "#" || !href) {
            return;
        }

        // Jika link mengarah ke halaman internal (.html)
        if (href.includes('.html') || href.startsWith('/') || href.startsWith('./')) {
            e.preventDefault(); // Stop pindah instan
            playClick();
            
            // Animasi tutup layar
            document.body.classList.remove('page-loaded');

            // Pindah halaman setelah animasi
            setTimeout(() => {
                window.location.href = href;
            }, 700);
        }
    });

    // === 7. PASANG SUARA HOVER KE SEMUA ELEMEN ===
    // Mencakup navigasi panjang, tombol next, dan frame robot
    const updateHoverElements = () => {
        const targets = document.querySelectorAll('.profile-frame, .profile-card, .music-card, .btn-pop, .menu-btn, .next-btn, .robot-frame, .robot-frame-home, .nav-list li a, .nav-row a, .contact-item, .close-btn, .btn-home-modal, .futuristic-frame, .rpg-card, .journey-item, .hud-frame, .journey-card, .project-card, .btn-yt, .btn-glow, .sad-gif');
        targets.forEach(el => {
            el.removeEventListener('mouseenter', playHover); // Hindari double event
            el.addEventListener('mouseenter', playHover);
        });
    };
    
    updateHoverElements();
    // Jalankan ulang jika ada konten dinamis
    const observer = new MutationObserver(updateHoverElements);
    observer.observe(document.body, { childList: true, subtree: true });
});
// ... di dalam event listener klik ...
if (href.includes('journey.html')) {
    e.preventDefault();
    playClick(); // Mainkan suara dulu

    // TAMBAHKAN EFEK VISUAL DI SINI (opsional)
    document.body.classList.add('shake-effect'); 
    document.body.classList.remove('page-loaded'); // Layar hitam turun

    setTimeout(() => {
        window.location.href = href; // Baru pindah halaman setelah 0.8 detik
    }, 800);
}
// Fungsi Buka Modal
function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.style.display = "flex";
        setTimeout(() => targetModal.classList.add("active"), 10);
        if (typeof playClick === 'function') playClick(); // Bunyi klik kamu
    }
}

// Fungsi Tutup Modal
function closeModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.classList.remove("active");
        setTimeout(() => targetModal.style.display = "none", 400);
        if (typeof playClick === 'function') playClick(); // Bunyi klik kamu
    }
}

// Klik di luar modal buat nutup
window.onclick = function(event) {
    if (event.target.classList.contains('modal-project')) {
        closeModal(event.target.id);
    }
};document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById('mainAudio');
    const playBtn = document.getElementById('playPauseBtn');
    const sadGif = document.getElementById('sadGif');

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.innerText = "⏸";
            // Opsional: GIF cuma goyang pas lagu nyala
            sadGif.style.animationPlayState = 'running';
        } else {
            audio.pause();
            playBtn.innerText = "▶";
            // Opsional: GIF diem pas lagu mati
            sadGif.style.animationPlayState = 'paused';
        }
    });
});