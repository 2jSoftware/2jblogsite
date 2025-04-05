document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  const menuToggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      menu.classList.toggle('nav__menu--active');
      
      // Accessibility
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
      menuToggle.setAttribute('aria-expanded', !expanded);
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (menu.classList.contains('nav__menu--active')) {
        menu.classList.remove('nav__menu--active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Simple form validation
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Normally you would send the form data to a server here
      // For this static site, we'll just show a success message
      const formData = new FormData(contactForm);
      const formEntries = Object.fromEntries(formData.entries());
      
      // Simple validation
      let isValid = true;
      for (const [key, value] of Object.entries(formEntries)) {
        if (!value.trim()) {
          isValid = false;
          break;
        }
      }
      
      if (isValid) {
        contactForm.innerHTML = '<div class="success-message">Thank you for your message! We\'ll get back to you soon.</div>';
      }
    });
  }
});
