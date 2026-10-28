/* ==========================================================
   GALERI KEGIATAN HARIAN - NURFITA LESTARI
   JavaScript Interactivity & Features
   Mata Kuliah: Web Development Management
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. DARK / LIGHT THEME TOGGLE (SYNC DENGAN CV) ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  const savedTheme = localStorage.getItem('cv-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.className = 'fa-solid fa-sun';
      themeToggleBtn.setAttribute('title', 'Beralih ke Tema Terang');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.className = 'fa-solid fa-moon';
      themeToggleBtn.setAttribute('title', 'Beralih ke Tema Gelap');
    }
  };

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (prefersDark) {
    applyTheme('dark');
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('cv-theme', newTheme);
  });


  // --- 2. MOBILE NAVIGATION MENU ---
  const navToggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navToggleIcon = navToggleBtn.querySelector('i');

  const toggleMenu = () => {
    navMenu.classList.toggle('open');
    if (navMenu.classList.contains('open')) {
      navToggleIcon.className = 'fa-solid fa-xmark';
    } else {
      navToggleIcon.className = 'fa-solid fa-bars';
    }
  };

  if (navToggleBtn) {
    navToggleBtn.addEventListener('click', toggleMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });


  // --- 3. FILTER TABS & PENCARIAN REAL-TIME ---
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  const galleryGrid = document.getElementById('gallery-grid');
  const searchInput = document.getElementById('gallery-search-input');
  const emptyState = document.getElementById('gallery-empty');
  const btnResetFilter = document.getElementById('btn-reset-filter');

  let currentCategory = 'all';
  let currentSearchQuery = '';

  // Hitung jumlah item di setiap tab
  const updateTabCounts = () => {
    const cards = document.querySelectorAll('.gallery-card');
    const counts = {
      all: cards.length,
      kuliah: 0,
      coding: 0,
      organisasi: 0,
      santai: 0
    };

    cards.forEach(card => {
      const cat = card.getAttribute('data-category');
      if (counts[cat] !== undefined) {
        counts[cat]++;
      }
    });

    document.getElementById('count-all').textContent = counts.all;
    document.getElementById('count-kuliah').textContent = counts.kuliah;
    document.getElementById('count-coding').textContent = counts.coding;
    document.getElementById('count-organisasi').textContent = counts.organisasi;
    document.getElementById('count-santai').textContent = counts.santai;
  };

  const filterGallery = () => {
    const cards = document.querySelectorAll('.gallery-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      const title = card.querySelector('.gallery-item-title').textContent.toLowerCase();
      const desc = card.querySelector('.gallery-item-desc').textContent.toLowerCase();
      const meta = card.querySelector('.gallery-meta').textContent.toLowerCase();

      const matchCategory = (currentCategory === 'all' || category === currentCategory);
      const matchSearch = currentSearchQuery === '' || 
                          title.includes(currentSearchQuery) || 
                          desc.includes(currentSearchQuery) ||
                          meta.includes(currentSearchQuery);

      if (matchCategory && matchSearch) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.4s ease forwards';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (visibleCount === 0) {
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';
    }
  };

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-filter');
      filterGallery();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      filterGallery();
    });
  }

  if (btnResetFilter) {
    btnResetFilter.addEventListener('click', () => {
      currentCategory = 'all';
      currentSearchQuery = '';
      if (searchInput) searchInput.value = '';
      galleryTabs.forEach(t => t.classList.remove('active'));
      document.querySelector('.gallery-tab[data-filter="all"]').classList.add('active');
      filterGallery();
    });
  }

  updateTabCounts();


  // --- 4. LIGHTBOX MODAL INTERAKTIF ---
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxTime = document.getElementById('lightbox-time');
  const lightboxLocation = document.getElementById('lightbox-location');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');

  let visibleCards = [];
  let currentActiveIndex = 0;

  const categoryLabels = {
    kuliah: { label: 'Perkuliahan', class: 'badge-kuliah' },
    coding: { label: 'Coding & Proyek', class: 'badge-coding' },
    organisasi: { label: 'Organisasi & Diskusi', class: 'badge-organisasi' },
    santai: { label: 'Hobi & Santai', class: 'badge-santai' }
  };

  const openLightbox = (card) => {
    // Kumpulkan kartu yang sedang terlihat
    visibleCards = Array.from(document.querySelectorAll('.gallery-card')).filter(c => c.style.display !== 'none');
    currentActiveIndex = visibleCards.indexOf(card);

    if (currentActiveIndex === -1) return;

    renderLightboxContent(visibleCards[currentActiveIndex]);
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // cegah scroll layar belakang
  };

  const renderLightboxContent = (card) => {
    const img = card.querySelector('.gallery-img');
    const categoryKey = card.getAttribute('data-category');
    const metaSpans = card.querySelectorAll('.gallery-meta span');
    const timeText = metaSpans[0] ? metaSpans[0].textContent.trim() : '';
    const locText = metaSpans[1] ? metaSpans[1].textContent.trim() : '';
    const title = card.querySelector('.gallery-item-title').textContent;
    const desc = card.querySelector('.gallery-item-desc').textContent;

    lightboxImg.src = img.src;
    lightboxImg.alt = title;

    const catInfo = categoryLabels[categoryKey] || { label: 'Kegiatan', class: 'badge-kuliah' };
    lightboxCategory.className = `gallery-badge ${catInfo.class}`;
    lightboxCategory.textContent = catInfo.label;

    lightboxTime.innerHTML = `<i class="fa-regular fa-clock"></i> ${timeText}`;
    lightboxLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${locText}`;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
  };

  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const showNextImage = () => {
    if (visibleCards.length === 0) return;
    currentActiveIndex = (currentActiveIndex + 1) % visibleCards.length;
    renderLightboxContent(visibleCards[currentActiveIndex]);
  };

  const showPrevImage = () => {
    if (visibleCards.length === 0) return;
    currentActiveIndex = (currentActiveIndex - 1 + visibleCards.length) % visibleCards.length;
    renderLightboxContent(visibleCards[currentActiveIndex]);
  };

  // Event delegasi pada gallery grid untuk klik kartu
  if (galleryGrid) {
    galleryGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.gallery-card');
      if (card) {
        openLightbox(card);
      }
    });
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  });


  // --- 5. PREVIEW & FORM TAMBAH KEGIATAN BARU ---
  const addForm = document.getElementById('add-activity-form');
  const actFileInput = document.getElementById('act-file');
  const previewBox = document.getElementById('file-preview-container');
  const previewImg = document.getElementById('file-preview-img');
  const btnRemovePreview = document.getElementById('btn-remove-preview');

  let uploadedImageData = null;

  // Placeholder cadangan berdasarkan kategori jika user tidak mengunggah gambar
  const defaultCategoryImages = {
    kuliah: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80',
    coding: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    organisasi: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    santai: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80'
  };

  if (actFileInput) {
    actFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          showToast('Silakan pilih file gambar yang valid.');
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          uploadedImageData = event.target.result;
          previewImg.src = uploadedImageData;
          previewBox.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (btnRemovePreview) {
    btnRemovePreview.addEventListener('click', () => {
      actFileInput.value = '';
      uploadedImageData = null;
      previewBox.style.display = 'none';
      previewImg.src = '';
    });
  }

  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('act-title').value.trim();
      const category = document.getElementById('act-category').value;
      const time = document.getElementById('act-time').value.trim();
      const location = document.getElementById('act-location').value.trim();
      const desc = document.getElementById('act-desc').value.trim();

      const imgSrc = uploadedImageData || defaultCategoryImages[category];
      const catInfo = categoryLabels[category] || { label: 'Kegiatan', class: 'badge-kuliah' };

      // Buat elemen card baru
      const newCard = document.createElement('div');
      newCard.className = 'gallery-card';
      newCard.setAttribute('data-category', category);
      newCard.innerHTML = `
        <div class="gallery-img-wrapper">
          <img src="${imgSrc}" alt="${title}" class="gallery-img" loading="lazy">
          <span class="gallery-badge ${catInfo.class}">${catInfo.label}</span>
          <div class="gallery-overlay">
            <span class="overlay-icon"><i class="fa-solid fa-magnifying-glass-plus"></i></span>
            <span class="overlay-text">Buka Foto Penuh</span>
          </div>
        </div>
        <div class="gallery-info">
          <div class="gallery-meta">
            <span><i class="fa-regular fa-clock"></i> ${time}</span>
            <span><i class="fa-solid fa-location-dot"></i> ${location}</span>
          </div>
          <h3 class="gallery-item-title">${title}</h3>
          <p class="gallery-item-desc">${desc}</p>
          <div class="gallery-footer-action">
            <span class="btn-view-card"><i class="fa-regular fa-eye"></i> Perbesar Gambar</span>
          </div>
        </div>
      `;

      // Masukkan ke posisi paling atas galeri
      galleryGrid.insertBefore(newCard, galleryGrid.firstChild);

      // Reset form & state
      addForm.reset();
      if (previewBox) previewBox.style.display = 'none';
      uploadedImageData = null;

      // Update hitungan tab
      updateTabCounts();

      // Filter ulang sesuai tab saat ini
      filterGallery();

      // Notifikasi & smooth scroll ke kartu yang baru ditambahkan
      showToast('Kegiatan baru berhasil ditambahkan ke galeri!');
      newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }


  // --- 6. TOAST NOTIFIKASI & BACK TO TOP ---
  const toast = document.getElementById('toast');
  const toastMessage = toast ? toast.querySelector('.toast-message') : null;
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  const backToTopBtn = document.getElementById('back-to-top');
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    if (header) {
      if (scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // --- 7. TAHUN OTOMATIS DI FOOTER ---
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});
