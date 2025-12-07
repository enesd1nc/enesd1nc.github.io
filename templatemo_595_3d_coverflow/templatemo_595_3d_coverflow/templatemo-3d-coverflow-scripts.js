/*

TemplateMo 595 3d coverflow

https://templatemo.com/tm-595-3d-coverflow

*/

// JavaScript Document

        // Coverflow functionality
        const items = document.querySelectorAll('.coverflow-item');
        const dotsContainer = document.getElementById('dots');
        const currentTitle = document.getElementById('current-title');
        const currentDescription = document.getElementById('current-description');
        const container = document.querySelector('.coverflow-container');
        const menuToggle = document.getElementById('menuToggle');
        const mainMenu = document.getElementById('mainMenu');
        let currentIndex = 5;
        let isAnimating = false;

        // Mobile menu toggle
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on menu items (except external links)
        document.querySelectorAll('.menu-item:not(.external)').forEach(item => {
            item.addEventListener('click', (e) => {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            }
        });

        // Image data with titles and descriptions
        const imageData = [
            {
                title: "Günlük Notlar",
                description: "Düşüncelerinizi ve günlük deneyimlerinizi kaydedin"
            },
            {
                title: "Proje Notları",
                description: "İş projeleriniz ve görevleriniz için notlar"
            },
            {
                title: "Toplantı Notları",
                description: "Önemli toplantı kayıtları ve kararları"
            },
            {
                title: "Ders Notları",
                description: "Öğrenme materyalleri ve ders kayıtları"
            },
            {
                title: "Yaratıcı Fikirler",
                description: "İlham anlarınız ve yaratıcı düşünceleriniz"
            },
            {
                title: "Seyahat Notları",
                description: "Gezileriniz ve keşiflerinizin anıları"
            },
            {
                title: "Tarif Notları",
                description: "Favori yemek tarifleriniz ve mutfak notları"
            },
            {
                title: "Yabancı Dil Notları",
                description: "Öğrendiğiniz yabancı diller ve kelimeler"
            },
            {
                title: "Duyurular & Kampanyalar",
                description: "Önemli haberler, özel fırsatlar ve güncel duyurular"
            },
            {
                title: "Sağlık Notları",
                description: "Sağlık takibi, ilaç hatırlatıcıları ve sağlık bilgileri"
            },
            {
                title: "Finans Notları",
                description: "Bütçe planlaması, harcamalar ve finansal hedefler"
            },
            {
                title: "Kitap Notları",
                description: "Okuduğunuz kitaplardan notlar, alıntılar ve değerlendirmeler"
            }
        ];

        // Create dots
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.onclick = () => goToIndex(index);
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');
        let autoplayInterval = null;
        let isPlaying = true;
        const playIcon = document.querySelector('.play-icon');
        const pauseIcon = document.querySelector('.pause-icon');

        function updateCoverflow() {
            if (isAnimating) return;
            isAnimating = true;

            items.forEach((item, index) => {
                let offset = index - currentIndex;
                
                if (offset > items.length / 2) {
                    offset = offset - items.length;
                }
                else if (offset < -items.length / 2) {
                    offset = offset + items.length;
                }
                
                const absOffset = Math.abs(offset);
                const sign = Math.sign(offset);
                
                let translateX = offset * 220;
                let translateZ = -absOffset * 200;
                let rotateY = -sign * Math.min(absOffset * 60, 60);
                let opacity = 1 - (absOffset * 0.2);
                let scale = 1 - (absOffset * 0.1);

                if (absOffset > 3) {
                    opacity = 0;

                    translateX = sign * 800;
                }

                item.style.transform = `
                    translateX(${translateX}px) 
                    translateZ(${translateZ}px) 
                    rotateY(${rotateY}deg)
                    scale(${scale})
                `;
                item.style.opacity = opacity;
                item.style.zIndex = 100 - absOffset;

                item.classList.toggle('active', index === currentIndex);
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            const currentData = imageData[currentIndex];
            currentTitle.textContent = currentData.title;
            currentDescription.textContent = currentData.description;
            
            currentTitle.style.animation = 'none';
            currentDescription.style.animation = 'none';
            setTimeout(() => {
                currentTitle.style.animation = 'fadeIn 0.6s forwards';
                currentDescription.style.animation = 'fadeIn 0.6s forwards';
            }, 10);

            setTimeout(() => {
                isAnimating = false;
            }, 600);
        }

        function navigate(direction) {
            if (isAnimating) return;
            
            currentIndex = currentIndex + direction;
            
            if (currentIndex < 0) {
                currentIndex = items.length - 1;
            } else if (currentIndex >= items.length) {
                currentIndex = 0;
            }
            
            updateCoverflow();
        }

        function goToIndex(index) {
            if (isAnimating || index === currentIndex) return;
            currentIndex = index;
            updateCoverflow();
        }

        // Keyboard navigation
        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openNotePage(currentIndex);
            }
        });

        // Click on items to select or open page
        items.forEach((item, index) => {
            let clickTimeout = null;
            
            item.addEventListener('click', () => {
                if (index === currentIndex) {
                    // If clicking on active item, open the note page after a short delay
                    // This allows for double-click detection
                    clickTimeout = setTimeout(() => {
                        openNotePage(index);
                    }, 300);
                } else {
                    // Otherwise just navigate to that item
                    goToIndex(index);
                }
            });
            
            // Add double-click for immediate opening
            item.addEventListener('dblclick', () => {
                if (clickTimeout) {
                    clearTimeout(clickTimeout);
                    clickTimeout = null;
                }
                openNotePage(index);
            });
        });

        // Function to open individual note pages
        function openNotePage(index) {
            const notePages = [
                'gunluk-notlar.html',
                'proje-notlari.html', 
                'toplanti-notlari.html',
                'ders-notlari.html',
                'yaratici-fikirler.html',
                'seyahat-notlari.html',
                'tarif-notlari.html',
                'yabanci-dil-notlari.html',
                'duyurular.html',
                'saglik-notlari.html',
                'finans-notlari.html',
                'kitap-notlari.html'
            ];
            
            if (notePages[index]) {
                window.location.href = notePages[index];
            }
        }

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        let isSwiping = false;

        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            isSwiping = true;
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            
            const currentX = e.changedTouches[0].screenX;
            const diff = currentX - touchStartX;
            
            if (Math.abs(diff) > 10) {
                e.preventDefault();
            }
        }, { passive: false });

        container.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
            isSwiping = false;
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 30;
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
                handleUserInteraction();
                
                if (diffX > 0) {
                    navigate(1);
                } else {
                    navigate(-1);
                }
            }
        }

        // Initialize images and reflections
        items.forEach((item, index) => {
            const img = item.querySelector('img');
            const reflection = item.querySelector('.reflection');
            
            img.onload = function() {

                this.parentElement.classList.remove('image-loading');
                reflection.style.setProperty('--bg-image', `url(${this.src})`);
                reflection.style.backgroundImage = `url(${this.src})`;
                reflection.style.backgroundSize = 'cover';
                reflection.style.backgroundPosition = 'center';
            };
            
            img.onerror = function() {
                this.parentElement.classList.add('image-loading');
            };
        });

        // Autoplay functionality
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % items.length;
                updateCoverflow();
            }, 4000);
            isPlaying = true;
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
            isPlaying = false;
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }

        function toggleAutoplay() {
            if (isPlaying) {
                stopAutoplay();
            } else {
                startAutoplay();
            }
        }

        function handleUserInteraction() {
            stopAutoplay();
        }

        // Add event listeners to stop autoplay on manual navigation
        items.forEach((item) => {
            item.addEventListener('click', handleUserInteraction);
        });

        document.querySelector('.nav-button.prev').addEventListener('click', handleUserInteraction);
        document.querySelector('.nav-button.next').addEventListener('click', handleUserInteraction);
        
        dots.forEach((dot) => {
            dot.addEventListener('click', handleUserInteraction);
        });

        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                handleUserInteraction();
            }
        });

        // Smooth scrolling and active menu item
        const sections = document.querySelectorAll('.section');
        const menuItems = document.querySelectorAll('.menu-item');
        const header = document.getElementById('header');
        const scrollToTopBtn = document.getElementById('scrollToTop');

        // Update active menu item on scroll
        function updateActiveMenuItem() {
            const scrollPosition = window.scrollY + 100;

            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    menuItems.forEach(item => {
                        if (!item.classList.contains('external')) {
                            item.classList.remove('active');
                        }
                    });
                    if (menuItems[index] && !menuItems[index].classList.contains('external')) {
                        menuItems[index].classList.add('active');
                    }
                }
            });

            // Header background on scroll
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Show/hide scroll to top button
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', updateActiveMenuItem);

        // Smooth scroll to section
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const targetId = item.getAttribute('href');
                
                // Check if it's an internal link (starts with #)
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                // External links will open normally in new tab
            });
        });

        // Logo click to scroll to top
        document.querySelector('.logo-container').addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Scroll to top button
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Form submission
        function handleSubmit(event) {
            event.preventDefault();
            alert('Mesajınız için teşekkürler! En kısa sürede size geri döneceğiz.');
            event.target.reset();
        }
        
        function handleComplaintSubmit(event) {
            event.preventDefault();
            const name = document.getElementById('complaintName').value;
            const email = document.getElementById('complaintEmail').value;
            const title = document.getElementById('complaintTitle').value;
            const content = document.getElementById('complaintContent').value;
            
            // Simulate sending email to customer service
            alert(`Şikayet/Öneriniz alınmıştır!\n\nMüşteri ilişkileri temsilcisine gönderiliyor...\n\nGönderen: ${name}\nE-posta: ${email}\nKonu: ${title}`);
            event.target.reset();
        }
        
        // Contact form tabs
        const tabButtons = document.querySelectorAll('.tab-btn');
        const contactForms = document.querySelectorAll('.contact-form');
        
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.getAttribute('data-tab');
                
                tabButtons.forEach(b => b.classList.remove('active'));
                contactForms.forEach(f => f.classList.remove('active'));
                
                btn.classList.add('active');
                if (tabName === 'contact') {
                    document.getElementById('contactForm').classList.add('active');
                } else {
                    document.getElementById('complaintForm').classList.add('active');
                }
            });
        });
        
        // Announcements data
        const announcementsData = [
            {
                id: 1,
                badge: 'Yeni Özellik',
                title: 'AI Destekli Not Özetleme Özelliği Eklendi',
                excerpt: 'Artık notlarınızı otomatik olarak özetleyebilirsiniz. Yapay zeka destekli özellik ile uzun notlarınızı kısa ve öz hale getirin.',
                content: 'NoteMaster\'a yeni eklenen AI destekli not özetleme özelliği ile artık uzun notlarınızı otomatik olarak özetleyebilirsiniz. Bu özellik sayesinde:\n\n• Uzun notlarınızı kısa ve öz hale getirebilirsiniz\n• Önemli noktaları otomatik olarak vurgulayabilirsiniz\n• Zaman kazanabilir ve daha verimli çalışabilirsiniz\n\nÖzellik şu anda beta aşamasında ve tüm kullanıcılarımız için ücretsizdir.',
                date: '15 Ocak 2025',
                attachments: [
                    { type: 'pdf', name: 'AI-Ozellik-Dokumani.pdf' },
                    { type: 'image', name: 'ai-ozellik-gorseli.jpg' }
                ]
            },
            {
                id: 2,
                badge: 'Kampanya',
                title: 'Premium Üyelikte %50 İndirim Fırsatı',
                excerpt: 'Sınırlı süre için Premium üyelikte %50 indirim! Tüm özelliklere sınırsız erişim ve öncelikli destek.',
                content: 'Özel kampanyamız kapsamında Premium üyelikte %50 indirim fırsatı! Bu kampanyadan yararlanarak:\n\n• Sınırsız not depolama alanı\n• Gelişmiş arama ve filtreleme özellikleri\n• Öncelikli müşteri desteği\n• Özel tema ve özelleştirme seçenekleri\n• Reklamsız deneyim\n\nKampanya 31 Ocak 2025 tarihine kadar geçerlidir. Hemen üye olun!',
                date: '10 Ocak 2025',
                attachments: [
                    { type: 'word', name: 'Kampanya-Detaylari.docx' }
                ]
            },
            {
                id: 3,
                badge: 'Duyuru',
                title: 'Yeni Mobil Uygulama Yayında',
                excerpt: 'NoteMaster mobil uygulaması artık iOS ve Android platformlarında kullanılabilir. Notlarınızı her yerden yönetin!',
                content: 'NoteMaster mobil uygulaması nihayet yayında! Artık notlarınızı her yerden yönetebilirsiniz.\n\nMobil uygulamanın özellikleri:\n\n• Offline çalışma desteği\n• Hızlı not alma\n• Ses kaydı ile not oluşturma\n• Fotoğraf ekleme\n• Senkronizasyon\n\niOS ve Android cihazlarınızdan App Store ve Google Play üzerinden indirebilirsiniz.',
                date: '5 Ocak 2025',
                attachments: [
                    { type: 'image', name: 'mobil-uygulama-ekran-goruntuleri.jpg' }
                ]
            },
            {
                id: 4,
                badge: 'Güncelleme',
                title: 'Güvenlik Güncellemesi ve İyileştirmeler',
                excerpt: 'Sistem güvenliği artırıldı ve performans iyileştirmeleri yapıldı. Daha hızlı ve güvenli bir deneyim için güncellemeyi yükleyin.',
                content: 'NoteMaster\'ın yeni güncellemesi ile:\n\n• Gelişmiş şifreleme algoritmaları\n• İki faktörlü kimlik doğrulama (2FA)\n• Performans iyileştirmeleri\n• Hata düzeltmeleri\n• Yeni güvenlik özellikleri\n\nTüm kullanıcılarımızın güncellemeyi yüklemesini öneriyoruz. Güncelleme otomatik olarak uygulanacaktır.',
                date: '2 Ocak 2025',
                attachments: [
                    { type: 'pdf', name: 'Guncelleme-Notlari.pdf' }
                ]
            },
            {
                id: 5,
                badge: 'Etkinlik',
                title: 'Webinar: Verimli Not Tutma Teknikleri',
                excerpt: 'Ücretsiz webinar\'ımıza katılın ve not tutma tekniklerini öğrenin. 25 Ocak 2025 saat 20:00\'de canlı yayında buluşalım.',
                content: 'NoteMaster ekibi olarak sizleri ücretsiz webinar\'ımıza davet ediyoruz!\n\nWebinar içeriği:\n\n• Verimli not tutma teknikleri\n• Not organizasyonu ipuçları\n• NoteMaster\'ın gelişmiş özelliklerini kullanma\n• Soru-cevap bölümü\n\nTarih: 25 Ocak 2025\nSaat: 20:00 (Türkiye Saati)\n\nKayıt için web sitemizden formu doldurun. Katılım ücretsizdir!',
                date: '1 Ocak 2025',
                attachments: [
                    { type: 'word', name: 'Webinar-Davetiyesi.docx' },
                    { type: 'image', name: 'webinar-afis.jpg' }
                ]
            }
        ];
        
        // Load announcements
        function loadAnnouncements() {
            const announcementsGrid = document.getElementById('announcementsGrid');
            if (!announcementsGrid) return;
            
            // Show first 5 announcements on main page
            const displayAnnouncements = announcementsData.slice(0, 5);
            
            announcementsGrid.innerHTML = displayAnnouncements.map(announcement => `
                <div class="announcement-card" onclick="openAnnouncementModal(${announcement.id})">
                    <span class="announcement-badge">${announcement.badge}</span>
                    <h3 class="announcement-title">${announcement.title}</h3>
                    <p class="announcement-excerpt">${announcement.excerpt}</p>
                    <div class="announcement-date">
                        <span>📅</span>
                        <span>${announcement.date}</span>
                    </div>
                </div>
            `).join('');
        }
        
        // Announcement modal
        function openAnnouncementModal(id) {
            const announcement = announcementsData.find(a => a.id === id);
            if (!announcement) return;
            
            let modal = document.getElementById('announcementModal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'announcementModal';
                modal.className = 'announcement-modal';
                document.body.appendChild(modal);
            }
            
            const attachmentsHTML = announcement.attachments ? announcement.attachments.map(att => {
                const icon = att.type === 'pdf' ? '📄' : att.type === 'word' ? '📝' : '🖼️';
                return `
                    <div class="attachment-item">
                        <div class="attachment-icon">${icon}</div>
                        <div class="attachment-name">${att.name}</div>
                    </div>
                `;
            }).join('') : '';
            
            modal.innerHTML = `
                <div class="announcement-modal-content">
                    <div class="announcement-modal-header">
                        <div>
                            <span class="announcement-badge">${announcement.badge}</span>
                            <h2 class="announcement-modal-title">${announcement.title}</h2>
                            <div class="announcement-modal-date">📅 ${announcement.date}</div>
                        </div>
                        <button class="announcement-modal-close" onclick="closeAnnouncementModal()">&times;</button>
                    </div>
                    <div class="announcement-modal-body">
                        ${announcement.content.split('\n').map(p => `<p>${p}</p>`).join('')}
                        ${announcement.attachments && announcement.attachments.length > 0 ? `
                            <div class="announcement-modal-attachments">
                                <h4>Ekler</h4>
                                ${attachmentsHTML}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Close on outside click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeAnnouncementModal();
                }
            });
        }
        
        function closeAnnouncementModal() {
            const modal = document.getElementById('announcementModal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Load announcements on page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadAnnouncements);
        } else {
            loadAnnouncements();
        }

        // Search functionality
        const searchContainer = document.getElementById('searchContainer');
        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        let isSearchActive = false;

        // Sample search data (in real app, this would come from a database)
        const searchData = [
            { title: "Günlük Notlar", description: "Düşüncelerinizi ve günlük deneyimlerinizi kaydedin", category: "gunluk", url: "gunluk-notlar.html" },
            { title: "Proje Notları", description: "İş projeleriniz ve görevleriniz için notlar", category: "proje", url: "proje-notlari.html" },
            { title: "Toplantı Notları", description: "Önemli toplantı kayıtları ve kararları", category: "toplanti", url: "toplanti-notlari.html" },
            { title: "Ders Notları", description: "Öğrenme materyalleri ve ders kayıtları", category: "ders", url: "ders-notlari.html" },
            { title: "Yaratıcı Fikirler", description: "İlham anlarınız ve yaratıcı düşünceleriniz", category: "yaratici", url: "yaratici-fikirler.html" },
            { title: "Seyahat Notları", description: "Gezileriniz ve keşiflerinizin anıları", category: "seyahat", url: "seyahat-notlari.html" },
            { title: "Tarif Notları", description: "Favori yemek tarifleriniz ve mutfak notları", category: "tarif", url: "tarif-notlari.html" },
            { title: "Yabancı Dil Notları", description: "Öğrendiğiniz yabancı diller ve kelimeler", category: "dil", url: "yabanci-dil-notlari.html" },
            { title: "Sağlık Notları", description: "Sağlık takibi, ilaç hatırlatıcıları ve sağlık bilgileri", category: "saglik", url: "saglik-notlari.html" },
            { title: "Finans Notları", description: "Bütçe planlaması, harcamalar ve finansal hedefler", category: "finans", url: "finans-notlari.html" },
            { title: "Kitap Notları", description: "Okuduğunuz kitaplardan notlar, alıntılar ve değerlendirmeler", category: "kitap", url: "kitap-notlari.html" }
        ];

        function toggleSearch() {
            isSearchActive = !isSearchActive;
            const searchBox = document.querySelector('.search-box');
            
            if (isSearchActive) {
                searchBox.classList.add('active');
                searchInput.focus();
            } else {
                searchBox.classList.remove('active');
                searchResults.classList.remove('active');
                searchInput.value = '';
            }
        }

        function performSearch(query) {
            if (!query.trim()) {
                searchResults.classList.remove('active');
                return;
            }

            const filteredResults = searchData.filter(item => 
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase())
            );

            displaySearchResults(filteredResults);
        }

        function displaySearchResults(results) {
            if (results.length === 0) {
                searchResults.innerHTML = '<div class="search-result-item"><div class="search-result-title">Sonuç bulunamadı</div></div>';
            } else {
                searchResults.innerHTML = results.map(result => `
                    <div class="search-result-item" onclick="window.location.href='${result.url}'">
                        <div class="search-result-title">${result.title}</div>
                        <div class="search-result-description">${result.description}</div>
                    </div>
                `).join('');
            }
            searchResults.classList.add('active');
        }

        searchBtn.addEventListener('click', toggleSearch);
        searchInput.addEventListener('input', (e) => performSearch(e.target.value));
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                toggleSearch();
            }
        });

        // Quick Note Modal functionality
        const quickNoteModal = document.getElementById('quickNoteModal');
        const quickNoteBtn = document.getElementById('quickNoteBtn');
        const closeModal = document.getElementById('closeModal');
        const cancelNote = document.getElementById('cancelNote');
        const quickNoteForm = document.getElementById('quickNoteForm');
        
        function openQuickNoteModal() {
            quickNoteModal.classList.add('active');
            document.getElementById('noteTitle').focus();
        }

        function closeQuickNoteModal() {
            quickNoteModal.classList.remove('active');
            quickNoteForm.reset();
        }

        quickNoteBtn.addEventListener('click', openQuickNoteModal);
        closeModal.addEventListener('click', closeQuickNoteModal);
        cancelNote.addEventListener('click', closeQuickNoteModal);

        quickNoteModal.addEventListener('click', (e) => {
            if (e.target === quickNoteModal) {
                closeQuickNoteModal();
            }
        });

        quickNoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('noteTitle').value;
            const category = document.getElementById('noteCategory').value;
            const content = document.getElementById('noteContent').value;
            
            // In a real app, this would save to a database
            console.log('Yeni not kaydedildi:', { title, category, content });
            
            // Show success message
            alert(`"${title}" başlıklı notunuz başarıyla kaydedildi!`);
            
            // Add to recent notes (simulate)
            addToRecentNotes(title, content, category);
            
            closeQuickNoteModal();
        });

        // Theme toggle functionality
        const themeToggle = document.getElementById('themeToggle');
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');
        
        function toggleTheme() {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            
            if (isLight) {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
            
            // Save theme preference
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        }

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }

        themeToggle.addEventListener('click', toggleTheme);

        // Keyboard shortcuts
        const shortcutsHelp = document.getElementById('shortcutsHelp');
        const closeShortcuts = document.getElementById('closeShortcuts');
        let shortcutsVisible = false;

        function showShortcuts() {
            shortcutsVisible = true;
            shortcutsHelp.classList.add('active');
            setTimeout(() => {
                if (shortcutsVisible) {
                    shortcutsHelp.classList.remove('active');
                    shortcutsVisible = false;
                }
            }, 5000); // Auto hide after 5 seconds
        }

        closeShortcuts.addEventListener('click', () => {
            shortcutsHelp.classList.remove('active');
            shortcutsVisible = false;
        });

        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+N - Quick note
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                openQuickNoteModal();
            }
            
            // Ctrl+F - Search
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                toggleSearch();
            }
            
            // Ctrl+T - Theme toggle
            if (e.ctrlKey && e.key === 't') {
                e.preventDefault();
                toggleTheme();
            }
            
            // Escape - Close modals
            if (e.key === 'Escape') {
                if (quickNoteModal.classList.contains('active')) {
                    closeQuickNoteModal();
                }
                if (isSearchActive) {
                    toggleSearch();
                }
                if (shortcutsVisible) {
                    shortcutsHelp.classList.remove('active');
                    shortcutsVisible = false;
                }
            }
            
            // F1 - Show shortcuts
            if (e.key === 'F1') {
                e.preventDefault();
                showShortcuts();
            }
        });

        // Recent notes functionality
        function addToRecentNotes(title, content, category) {
            const recentNotesGrid = document.getElementById('recentNotesGrid');
            const categoryIcons = {
                'gunluk': '📝',
                'proje': '💼',
                'toplanti': '🤝',
                'ders': '📚',
                'yaratici': '💡',
                'seyahat': '🌍',
                'tarif': '🍳',
                'dil': '🗣️',
                'saglik': '🏥',
                'finans': '💰',
                'kitap': '📖'
            };
            
            const newNoteCard = document.createElement('div');
            newNoteCard.className = 'recent-note-card';
            newNoteCard.innerHTML = `
                <div class="note-icon">${categoryIcons[category] || '📝'}</div>
                <div class="note-info">
                    <h4>${title}</h4>
                    <p>${content.substring(0, 30)}...</p>
                    <span class="note-date">Az önce</span>
                </div>
            `;
            
            // Add to beginning and remove last if more than 4
            recentNotesGrid.insertBefore(newNoteCard, recentNotesGrid.firstChild);
            if (recentNotesGrid.children.length > 4) {
                recentNotesGrid.removeChild(recentNotesGrid.lastChild);
            }
        }

        // Enhanced mobile touch handling
        let touchStartTime = 0;
        
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            touchStartTime = Date.now();
            isSwiping = true;
        }, { passive: true });

        // Initialize
        updateCoverflow();
        container.focus();
        startAutoplay();
        
        // Show shortcuts hint on first visit
        if (!localStorage.getItem('shortcutsShown')) {
            setTimeout(() => {
                showShortcuts();
                localStorage.setItem('shortcutsShown', 'true');
            }, 3000);
        }