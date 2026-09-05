document.addEventListener('DOMContentLoaded', () => {
  // Initial Splash Screen: lasts 1.5s then fades out smoothly
  const splashScreen = document.getElementById('splashScreen');
  if (splashScreen) {
    setTimeout(() => {
      splashScreen.classList.add('splash-hidden');
      setTimeout(() => {
        if (splashScreen.parentNode) {
          splashScreen.parentNode.removeChild(splashScreen);
        }
      }, 700);
    }, 1500);
  }

  // Mobile Navigation Drawer Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const navLinks = document.querySelectorAll('.mobile-nav .nav-link');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      const isOpen = mobileNav.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking on any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
      });
    });
  }

  // Trial Class Form Handler: Send directly via WhatsApp or show confirmation
  const trialForm = document.getElementById('trialForm');
  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('formName').value;
      const phone = document.getElementById('formPhone').value;
      const discipline = document.getElementById('formDiscipline').value;
      const message = document.getElementById('formMessage').value;

      const whatsappText = encodeURIComponent(
        `¡Hola Team Cuevas BJJ! Me llamo ${name}. Quiero reservar mi primera clase gratis de ${discipline}. Mi teléfono es ${phone}. ${message ? `Nota: ${message}` : ''}`
      );
      
      // WhatsApp direct redirect
      const whatsappUrl = `https://wa.me/34600000000?text=${whatsappText}`; // Replace or open
      
      // Show confirmation feedback
      const submitBtn = trialForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '¡Solicitud enviada!';
      submitBtn.style.backgroundColor = 'var(--primary)';
      submitBtn.style.color = '#000';

      setTimeout(() => {
        alert(`¡Gracias ${name}! Tu solicitud para la clase gratis de ${discipline} ha sido registrada. También puedes contactar directamente al club por WhatsApp.`);
        trialForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.style.color = '';
      }, 500);
    });
  }

  // Header background on scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.backgroundColor = 'rgba(14, 14, 17, 0.95)';
    } else {
      header.style.backgroundColor = 'rgba(19, 19, 22, 0.85)';
    }
  });

  // Interactive Multimedia Gallery (Filters & Lightbox)
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryModal = document.getElementById('galleryModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');
  const modalMediaViewport = document.getElementById('modalMediaViewport');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalCaption = document.getElementById('modalCaption');
  const modalIgLink = document.getElementById('modalIgLink');

  let currentVisibleIndex = 0;

  function getVisibleItems() {
    return Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
  }

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const categories = item.getAttribute('data-category') || '';
        if (filter === 'all' || categories.split(' ').includes(filter)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Lightbox Modal Functions
  function openModal(index) {
    const visible = getVisibleItems();
    if (!visible.length) return;

    currentVisibleIndex = (index + visible.length) % visible.length;
    const item = visible[currentVisibleIndex];

    const type = item.getAttribute('data-type');
    const src = item.getAttribute('data-src');
    const thumb = item.getAttribute('data-thumb');
    const title = item.getAttribute('data-title') || '';
    const caption = item.getAttribute('data-caption') || '';
    const igUrl = item.getAttribute('data-ig') || 'https://www.instagram.com/team_cuevasbjj/';

    // Reset container and pause any previous media
    if (modalMediaViewport) {
      modalMediaViewport.innerHTML = '';

      if (type === 'video') {
        modalBadge.textContent = 'Reel / Vídeo';
        modalBadge.style.color = 'var(--primary)';
        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.loop = true;
        video.poster = thumb || '';
        video.innerHTML = `<source src="${src}" type="video/mp4">Tu navegador no soporta reproducción de vídeo HTML5.`;
        modalMediaViewport.appendChild(video);
      } else {
        modalBadge.textContent = 'Fotografía';
        modalBadge.style.color = 'var(--text-secondary)';
        const img = document.createElement('img');
        img.src = src;
        img.alt = title;
        modalMediaViewport.appendChild(img);
      }
    }

    modalTitle.textContent = title;
    modalCaption.textContent = caption;
    modalIgLink.href = igUrl;

    galleryModal.classList.add('active');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!galleryModal) return;
    galleryModal.classList.remove('active');
    galleryModal.setAttribute('aria-hidden', 'true');
    
    // Stop any video playback
    if (modalMediaViewport) {
      const video = modalMediaViewport.querySelector('video');
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
      modalMediaViewport.innerHTML = '';
    }
    document.body.style.overflow = '';
  }

  function navigateModal(direction) {
    const visible = getVisibleItems();
    if (!visible.length) return;
    openModal(currentVisibleIndex + direction);
  }

  // Open modal on item click
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const visible = getVisibleItems();
      const index = visible.indexOf(item);
      if (index !== -1) {
        openModal(index);
      }
    });
  });

  // Modal controls
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  if (modalPrev) modalPrev.addEventListener('click', () => navigateModal(-1));
  if (modalNext) modalNext.addEventListener('click', () => navigateModal(1));

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!galleryModal || !galleryModal.classList.contains('active')) return;
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      navigateModal(-1);
    } else if (e.key === 'ArrowRight') {
      navigateModal(1);
    }
  });
});
