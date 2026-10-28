/* ==========================================================
   CURRICULUM VITAE - NURFITA LESTARI
   JavaScript Interactivity & Features
   Mata Kuliah: Web Development Management
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. DARK / LIGHT THEME TOGGLE ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Ambil preferensi tema dari localStorage atau sistem
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

  // Inisialisasi tema
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

  navToggleBtn.addEventListener('click', toggleMenu);

  // Tutup menu mobile ketika tautan diklik
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });


  // --- 3. SCROLL SPY (ACTIVE LINK ON SCROLL) ---
  const sections = document.querySelectorAll('section[id]');

  const scrollActive = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', scrollActive);


  // --- 4. HERO DYNAMIC TYPING EFFECT ---
  const typedTextSpan = document.getElementById('typed-text');
  const textArray = [
    'Web Developer',
    'Frontend Enthusiast',
    'Mahasiswi Semester 7',
    'UI/UX Explorer',
    'Problem Solver'
  ];
  const typingDelay = 100;
  const erasingDelay = 60;
  const newTextDelay = 1800; // Jeda sebelum teks dihapus
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 400);
    }
  }

  if (textArray.length) {
    setTimeout(type, 800);
  }


  // --- 5. FILTER PENGALAMAN (TABS) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const expCards = document.querySelectorAll('.exp-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Ubah tombol aktif
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      expCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // --- 6. ANIMASI PROGRESS BAR KEAHLIAN SAAT SCROLL ---
  const skillBars = document.querySelectorAll('.progress-bar-fill');
  let animatedSkills = false;

  const animateSkillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedSkills) {
        skillBars.forEach(bar => {
          const targetProgress = bar.getAttribute('data-progress');
          bar.style.width = targetProgress;
        });
        animatedSkills = true;
      }
    });
  }, { threshold: 0.25 });

  const keahlianSection = document.getElementById('keahlian');
  if (keahlianSection) {
    animateSkillsObserver.observe(keahlianSection);
  }


  // --- 7. UPLOAD & PREVIEW FOTO PROFIL ---
  const avatarInput = document.getElementById('avatar-input');
  const profileImg = document.getElementById('profile-img');

  if (avatarInput && profileImg) {
    avatarInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        // Validasi ekstensi gambar
        if (!file.type.startsWith('image/')) {
          alert('Mohon pilih file gambar yang valid.');
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          profileImg.src = event.target.result;
          showToast('Foto profil berhasil diperbarui!');
        };
        reader.readAsDataURL(file);
      }
    });
  }


  // --- 8. FORMULIR KONTAK & TOAST NOTIFIKASI ---
  const contactForm = document.getElementById('contact-form');
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

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('btn-submit');
      const originalBtnText = submitBtn.innerHTML;

      // Efek loading
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirimkan...';

      // Simulasi pengiriman form (1 detik)
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        const senderName = document.getElementById('name').value;
        contactForm.reset();
        
        showToast(`Terima kasih, ${senderName}! Pesan Anda telah berhasil terkirim.`);
      }, 1000);
    });
  }


  // --- 9. TOMBOL BACK TO TOP & NAVBAR SHADOW ---
  const backToTopBtn = document.getElementById('back-to-top');
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Tampilkan tombol back-to-top jika scroll lebih dari 350px
    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Berikan bayangan halus pada navbar saat di-scroll
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


  // --- 10. TAHUN OTOMATIS DI FOOTER ---
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});

