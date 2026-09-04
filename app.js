document.addEventListener('DOMContentLoaded', () => {
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
});
