// script.js - FULLY FIXED Barber Shop with Perfect Testimonials & Theme

document.addEventListener('DOMContentLoaded', function() {

  // ========================
  // 1. MOBILE MENU (Smooth animated color)
  // ========================
  const menuIcon = document.getElementById('menuIcon');
  const mobileNav = document.getElementById('mobileNav');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const closeMobileBtn = document.getElementById('closeMobileBtn');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMobileMenu() {
    mobileNav.classList.add('open');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Animated color pulse effect
    const menuBars = menuIcon?.querySelector('i');
    if(menuBars) {
      menuBars.style.animation = 'pulse 0.4s ease';
      setTimeout(() => {
        if(menuBars) menuBars.style.animation = '';
      }, 400);
    }
  }

  function closeMobileMenu() {
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if(menuIcon) menuIcon.addEventListener('click', openMobileMenu);
  if(closeMobileBtn) closeMobileBtn.addEventListener('click', closeMobileMenu);
  if(mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if(targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
      closeMobileMenu();
    });
  });

  // ========================
  // 2. TESTIMONIALS - SIMPLE & RELIABLE CAROUSEL (FIXED)
  // ========================
  const testimonialGrid = document.getElementById('testimonialGrid');
  const prevBtn = document.querySelector('.testi-prev');
  const nextBtn = document.querySelector('.testi-next');
  
  if(testimonialGrid && prevBtn && nextBtn) {
    let currentSlide = 0;
    let slides = Array.from(document.querySelectorAll('.testimonial-card'));
    let slidesPerView = getSlidesPerView();
    let totalSlides = slides.length;
    let autoSlideInterval;
    
    function getSlidesPerView() {
      if(window.innerWidth <= 768) return 1;
      if(window.innerWidth <= 992) return 2;
      return 3;
    }
    
    function updateCarousel() {
      const slideWidth = slides[0]?.offsetWidth || 300;
      const gap = 32; // 2rem gap
      const slideTotalWidth = slideWidth + gap;
      const translateValue = -currentSlide * slideTotalWidth;
      testimonialGrid.style.transform = `translateX(${translateValue}px)`;
    }
    
    function nextSlide() {
      const maxSlide = totalSlides - slidesPerView;
      if(currentSlide < maxSlide) {
        currentSlide++;
      } else {
        currentSlide = 0; // Loop back to start
      }
      updateCarousel();
      addSlideAnimation();
    }
    
    function prevSlide() {
      if(currentSlide > 0) {
        currentSlide--;
      } else {
        currentSlide = totalSlides - slidesPerView;
      }
      updateCarousel();
      addSlideAnimation();
    }
    
    function addSlideAnimation() {
      testimonialGrid.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      setTimeout(() => {
        testimonialGrid.style.transition = '';
      }, 500);
    }
    
    function startAutoSlide() {
      if(autoSlideInterval) clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    
    function stopAutoSlide() {
      if(autoSlideInterval) clearInterval(autoSlideInterval);
    }
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newPerView = getSlidesPerView();
        if(newPerView !== slidesPerView) {
          slidesPerView = newPerView;
          currentSlide = 0;
          updateCarousel();
        }
      }, 200);
    });
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });
    
    // Pause on hover
    testimonialGrid.addEventListener('mouseenter', stopAutoSlide);
    testimonialGrid.addEventListener('mouseleave', startAutoSlide);
    
    // Initialize
    updateCarousel();
    startAutoSlide();
  }
  
  // ========================
  // 3. THEME: DARK/LIGHT TOGGLE (Optional - adds modern theme switcher)
  // ========================
  // Create theme toggle button dynamically
  const themeToggle = document.createElement('div');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  themeToggle.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #c7a55b;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
  `;
  document.body.appendChild(themeToggle);
  
  let isDarkTheme = true;
  themeToggle.addEventListener('click', () => {
    if(isDarkTheme) {
      document.body.style.backgroundColor = '#f5f5f5';
      document.body.style.color = '#1a1a1a';
      document.querySelectorAll('.service-card, .testimonial-card, .contact-info .info-item, .hours').forEach(el => {
        el.style.backgroundColor = '#ffffff';
        el.style.color = '#1a1a1a';
        el.style.borderColor = '#e0e0e0';
      });
      document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea').forEach(el => {
        el.style.backgroundColor = '#ffffff';
        el.style.color = '#1a1a1a';
        el.style.borderColor = '#ddd';
      });
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      themeToggle.style.background = '#333';
      isDarkTheme = false;
    } else {
      document.body.style.backgroundColor = '#0a0a0a';
      document.body.style.color = '#f5f5f5';
      document.querySelectorAll('.service-card, .testimonial-card, .contact-info .info-item, .hours').forEach(el => {
        el.style.backgroundColor = '#1a1a1a';
        el.style.color = '#f5f5f5';
        el.style.borderColor = '#2a2a2a';
      });
      document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea').forEach(el => {
        el.style.backgroundColor = '#1f1f1f';
        el.style.color = '#ffffff';
        el.style.borderColor = '#333';
      });
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      themeToggle.style.background = '#c7a55b';
      isDarkTheme = true;
    }
  });
  
  // ========================
  // 4. CONTACT FORM HANDLER
  // ========================
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  
  if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = contactForm.querySelector('input[placeholder="Full Name"]')?.value.trim();
      const email = contactForm.querySelector('input[placeholder="Email Address"]')?.value.trim();
      if(!name || !email) {
        if(formFeedback) {
          formFeedback.style.color = '#ff8a7a';
          formFeedback.textContent = '❌ Please enter name and email address.';
          setTimeout(() => { if(formFeedback) formFeedback.textContent = ''; }, 3000);
        }
        return;
      }
      if(formFeedback) {
        formFeedback.style.color = '#c7a55b';
        formFeedback.innerHTML = '✨ Appointment Request Sent! We\'ll confirm within 2 hours. ✨';
        contactForm.reset();
        setTimeout(() => {
          if(formFeedback) formFeedback.innerHTML = '';
        }, 4000);
      }
    });
  }
  
  // ========================
  // 5. SMOOTH SCROLLING
  // ========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if(targetId === "#" || targetId === "") return;
      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // ========================
  // 6. NAVBAR SCROLL EFFECT
  // ========================
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 50) {
      navbar.style.background = 'rgba(0, 0, 0, 0.95)';
      navbar.style.backdropFilter = 'blur(16px)';
      navbar.style.borderBottom = '1px solid #c7a55b';
    } else {
      navbar.style.background = 'rgba(0, 0, 0, 0.85)';
      navbar.style.backdropFilter = 'blur(12px)';
      navbar.style.borderBottom = '1px solid rgba(199, 165, 91, 0.3)';
    }
  });
  
  // ========================
  // 7. SCROLL DOWN INDICATOR
  // ========================
  const scrollDown = document.querySelector('.scroll-down');
  if(scrollDown) {
    scrollDown.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if(aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  // ========================
  // 8. SCROLL REVEAL ANIMATIONS (Theme consistency)
  // ========================
  const revealElements = document.querySelectorAll('.service-card, .testimonial-card, .about-text, .contact-info, .contact-form');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    revealObserver.observe(el);
  });
  
  // ========================
  // 9. VIDEO BACKGROUND
  // ========================
  const heroVideo = document.getElementById('heroVideo');
  if(heroVideo) {
    heroVideo.play().catch(e => console.log("Video autoplay blocked, user interaction needed"));
    // Add loading animation
    heroVideo.addEventListener('loadeddata', () => {
      heroVideo.style.opacity = '1';
    });
    heroVideo.style.opacity = '0';
    heroVideo.style.transition = 'opacity 1s ease';
    setTimeout(() => {
      heroVideo.style.opacity = '1';
    }, 100);
  }
  
  // ========================
  // 10. ADD KEYFRAME ANIMATION FOR PULSE (if not in CSS)
  // ========================
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); color: #e0b87a; }
      100% { transform: scale(1); }
    }
    .testimonial-card {
      transition: all 0.3s ease;
    }
    .testimonial-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(199,165,91,0.2);
    }
    .theme-toggle:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    }
  `;
  document.head.appendChild(styleSheet);
  
  // ========================
  // 11. ADD TESTIMONIAL INDICATOR DOTS (Enhanced UX)
  // ========================
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'testimonial-dots';
  dotsContainer.style.cssText = `
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 25px;
  `;
  const testimonialsSection = document.querySelector('#testimonials .container');
  if(testimonialsSection && document.querySelector('.testimonial-controls')) {
    const controls = document.querySelector('.testimonial-controls');
    controls.parentNode.insertBefore(dotsContainer, controls.nextSibling);
    
    const totalTestimonials = document.querySelectorAll('.testimonial-card:not(.testimonial-clone)').length;
    for(let i = 0; i < totalTestimonials; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.style.cssText = `
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #555;
        cursor: pointer;
        transition: all 0.3s ease;
      `;
      if(i === 0) dot.style.background = '#c7a55b';
      dot.addEventListener('click', () => {
        // Update slide to match dot index
        const slidesPerView = getSlidesPerView();
        const maxSlide = totalTestimonials - slidesPerView;
        let targetSlide = i;
        if(targetSlide > maxSlide) targetSlide = maxSlide;
        currentSlide = targetSlide;
        updateCarousel();
        addSlideAnimation();
        // Update dots
        document.querySelectorAll('.dot').forEach((d, idx) => {
          d.style.background = idx === i ? '#c7a55b' : '#555';
        });
      });
      dotsContainer.appendChild(dot);
    }
    
    // Update dots on slide change
    const originalNextSlide = nextSlide;
    const originalPrevSlide = prevSlide;
    window.nextSlide = function() {
      originalNextSlide();
      updateDots();
    };
    window.prevSlide = function() {
      originalPrevSlide();
      updateDots();
    };
    
    function updateDots() {
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, idx) => {
        dot.style.background = idx === currentSlide ? '#c7a55b' : '#555';
      });
    }
  }
  
  console.log('✅ Blade & Co. - Fully loaded with perfect testimonials & dynamic theme!');
});