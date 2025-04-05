document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  const menuToggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  
  if (menuToggle && menu) {
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
      const href = this.getAttribute('href');
      // Ensure it's a link to an element on the *current* page, not just '#' or external
      if (href.length > 1 && href.startsWith('#')) { 
          const targetElement = document.querySelector(href);
          if (targetElement) {
            e.preventDefault(); // Prevent default only if target exists
            
            // Close mobile menu if open before scrolling
            if (menu && menuToggle && menu.classList.contains('nav__menu--active')) {
              menu.classList.remove('nav__menu--active');
              menuToggle.setAttribute('aria-expanded', 'false');
            }
            
            targetElement.scrollIntoView({ behavior: 'smooth' });

            // Optional: Update focus to the target section for accessibility
            // targetElement.setAttribute('tabindex', '-1'); // Make it focusable
            // targetElement.focus(); 
          }
      }
    });
  });
  
  // Scroll to Top Button
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  const scrollThreshold = 300; // Show button after scrolling down 300px

  if (scrollToTopBtn) { // Check if button exists
      window.addEventListener('scroll', () => {
          if (window.pageYOffset > scrollThreshold) {
              scrollToTopBtn.style.display = 'block';
              // Optional: Fade in effect
              requestAnimationFrame(() => {
                  scrollToTopBtn.style.opacity = '0.8'; 
              });
          } else {
              // Optional: Fade out effect
              scrollToTopBtn.style.opacity = '0';
              // Hide completely after fade out transition
              setTimeout(() => { 
                  if (window.pageYOffset <= scrollThreshold) { // Re-check condition
                      scrollToTopBtn.style.display = 'none'; 
                  }
              }, 300); // Match transition duration
          }
      });

      scrollToTopBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

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

  // Skip to Content Link
  const skipLink = document.getElementById('skip-link');
  const mainContent = document.querySelector('main'); // Assuming <main> holds the primary content

  if (skipLink && mainContent) {
    skipLink.addEventListener('focus', () => {
      skipLink.style.opacity = '1';
      skipLink.style.top = '10px';
    });

    skipLink.addEventListener('blur', () => {
        // Optionally hide again on blur, or keep visible once focused
        // skipLink.style.opacity = '0'; 
        // skipLink.style.top = '-40px';
    });

    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      mainContent.setAttribute('tabindex', '-1'); // Make main focusable programmatically
      mainContent.focus();
      // Optionally, scroll smoothly if needed, though focus usually handles it
      // mainContent.scrollIntoView({ behavior: 'smooth' }); 
    });
  }
});
