// Shared Header and Footer Components for NoteMaster
// Bu dosya tüm sayfalarda tutarlı header ve footer sağlar

document.addEventListener('DOMContentLoaded', function() {
    injectHeader();
    injectFooter();
    setupMobileMenu();
    highlightCurrentPage();
    setupScrollToTop();
});

function injectHeader() {
    // Eğer zaten header varsa, güncelle
    let header = document.querySelector('header.header, header#header');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const headerHTML = `
    <header class="header" id="header">
        <a href="index.html" class="logo-container">
            <div class="logo">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <rect x="10" y="25" width="15" height="50" fill="url(#grad1)" transform="rotate(-15 17.5 50)" />
                    <rect x="35" y="15" width="15" height="70" fill="url(#grad1)" />
                    <rect x="60" y="25" width="15" height="50" fill="url(#grad1)" transform="rotate(15 67.5 50)" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad1)" stroke-width="2" opacity="0.5" />
                </svg>
            </div>
            <div class="logo-text">NoteMaster</div>
        </a>
        
        <nav class="main-menu" id="mainMenu">
            <a href="index.html" class="menu-item ${currentPage === 'index.html' ? 'active' : ''}">Ana Sayfa</a>
            <a href="notlarim.html" class="menu-item ${currentPage === 'notlarim.html' ? 'active' : ''}">Notlarım</a>
            <a href="duyurular.html" class="menu-item ${currentPage === 'duyurular.html' ? 'active' : ''}">Duyurular</a>
            <div class="menu-item dropdown">
                <a href="urunlerimiz.html" class="menu-item-link ${['urunlerimiz.html', 'gunluk-notlar.html', 'proje-notlari.html', 'ders-notlari.html', 'tarif-notlari.html', 'yabanci-dil-notlari.html'].includes(currentPage) ? 'active' : ''}">Ürünlerimiz <span class="dropdown-arrow">▼</span></a>
                <div class="dropdown-menu">
                    <a href="gunluk-notlar.html">📅 Günlük Notlar</a>
                    <a href="proje-notlari.html">📁 Proje Notları</a>
                    <a href="ders-notlari.html">📚 Ders Notları</a>
                    <a href="tarif-notlari.html">🍳 Tarif Notları</a>
                    <a href="yabanci-dil-notlari.html">🌍 Yabancı Dil Notları</a>
                </div>
            </div>
            <div class="menu-item dropdown">
                <a href="birimlerimiz.html" class="menu-item-link ${['birimlerimiz.html', 'toplanti-notlari.html', 'yaratici-fikirler.html', 'seyahat-notlari.html'].includes(currentPage) ? 'active' : ''}">Birimlerimiz <span class="dropdown-arrow">▼</span></a>
                <div class="dropdown-menu">
                    <a href="toplanti-notlari.html">🤝 Toplantı Notları</a>
                    <a href="yaratici-fikirler.html">💡 Yaratıcı Fikirler</a>
                    <a href="seyahat-notlari.html">✈️ Seyahat Notları</a>
                </div>
            </div>
            <a href="hakkimizda.html" class="menu-item ${currentPage === 'hakkimizda.html' ? 'active' : ''}">Hakkımızda</a>
            <a href="misyon-vizyon.html" class="menu-item ${currentPage === 'misyon-vizyon.html' ? 'active' : ''}">Misyon-Vizyon</a>
            <a href="index.html#contact" class="menu-item">İletişim</a>
            <a href="admin.html" class="menu-item admin-btn ${currentPage === 'admin.html' ? 'active' : ''}">🔐 Admin</a>
        </nav>
        
        <div class="menu-toggle" id="menuToggle">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </header>`;

    if (header) {
        header.outerHTML = headerHTML;
    } else {
        // Header yoksa body'nin başına ekle
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }
    
    // Back button varsa kaldırma, ama header'ın altına taşı
    const backBtn = document.querySelector('.back-btn, button[onclick="goBack()"]');
    if (backBtn) {
        backBtn.style.position = 'fixed';
        backBtn.style.top = '85px';
        backBtn.style.left = '20px';
        backBtn.style.zIndex = '999';
    }
}

function injectFooter() {
    // Eğer zaten footer varsa, güncelle
    let footer = document.querySelector('footer.footer');
    
    const footerHTML = `
    <footer class="footer" id="siteFooter">
        <div class="footer-content">
            <div class="footer-section">
                <h4>📝 NoteMaster</h4>
                <p>Akıllı not tutma platformu ile düşüncelerinizi organize edin, fikirlerinizi geliştirin ve hayatınızı kolaylaştırın. NoteMaster ile notlarınızı her yerden yönetin!</p>
            </div>
            <div class="footer-section">
                <h4>📞 İletişim Bilgileri</h4>
                <p><strong>📍 Adres:</strong> Taksim Meydanı, Beyoğlu, İstanbul</p>
                <p><strong>☎️ Telefon:</strong> +90 (212) 555-0123</p>
                <p><strong>📧 E-posta:</strong> info@notemaster.com</p>
                <p><strong>🌐 Web:</strong> www.notemaster.com</p>
            </div>
            <div class="footer-section">
                <h4>🔗 Sosyal Medya</h4>
                <div class="footer-social">
                    <a href="https://facebook.com" target="_blank" class="footer-social-btn" title="Facebook">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" class="footer-social-btn" title="Twitter">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" class="footer-social-btn" title="LinkedIn">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" class="footer-social-btn" title="Instagram">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 110 12.324 6.162 6.162 0 010-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg>
                    </a>
                </div>
            </div>
            <div class="footer-section">
                <h4>👨‍💻 Tasarımcı Bilgileri</h4>
                <p><strong>Tasarımcı:</strong> Mehmet Enes Dinç</p>
                <p><strong>Bölüm:</strong> Bilişim Sistemleri Mühendisliği</p>
                <p><strong>Kurum:</strong> Kocaeli Üniversitesi</p>
                <p><strong>Ders:</strong> TBL303: Web Tasarımı</p>
                <p><strong>Dönem:</strong> 2025-2026 Güz Dönemi</p>
                <p style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <strong>Proje:</strong> NoteMaster - Akıllı Not Tutma Uygulaması
                </p>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="footer-copyright">
                © 2025 NoteMaster. Tüm hakları saklıdır. | Designed with ❤️ by Mehmet Enes Dinç
            </div>
            <div class="footer-links">
                <a href="#privacy" onclick="event.preventDefault(); alert('Gizlilik Politikası:\\n\\n1. Kişisel Veriler: Kullanıcı bilgileri gizli tutulur.\\n2. Çerezler: Site deneyimini iyileştirmek için kullanılır.\\n3. Veri Paylaşımı: Üçüncü şahıslarla paylaşılmaz.\\n4. Güvenlik: SSL şifreleme ile korunur.');">Gizlilik Politikası</a>
                <a href="#terms" onclick="event.preventDefault(); alert('Kullanım Şartları:\\n\\n1. Hizmet Kullanımı: Yasal amaçlarla kullanılmalıdır.\\n2. Hesap Güvenliği: Kullanıcı sorumluluğundadır.\\n3. Telif Hakları: İçerikler telif koruması altındadır.\\n4. Değişiklikler: Şartlar önceden bildirilmeksizin değiştirilebilir.');">Kullanım Şartları</a>
                <a href="#cookies" onclick="event.preventDefault(); alert('Çerez Politikası:\\n\\nSitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. Siteyi kullanmaya devam ederek çerez kullanımını kabul etmiş olursunuz.');">Çerez Politikası</a>
            </div>
        </div>
    </footer>
    
    <!-- Scroll to top button -->
    <div class="scroll-to-top" id="scrollToTop">
        <span>↑</span>
    </div>`;

    if (footer) {
        footer.outerHTML = footerHTML;
    } else {
        // Footer yoksa body'nin sonuna ekle
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
}

function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.getElementById('mainMenu');
    
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            }
        });
    }
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.menu-item, .menu-item-link').forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        }
    });
}

function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.display = 'flex';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
