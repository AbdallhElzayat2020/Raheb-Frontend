// ===== DOM Elements =====
const navLinks = document.querySelectorAll('.nav-link');
const faqItems = document.querySelectorAll('.faq-item');
const statNumbers = document.querySelectorAll('.stat-number');
const loader = document.getElementById('loader');
const navbar = document.querySelector('.navbar');

// ===== Mobile Navigation =====
function initMobileNavigation() {
  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20; // Add extra 20px offset

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        // Update active navigation after scroll
        setTimeout(() => {
          updateActiveNavigation();
        }, 100);
      }
    });
  });
}

// ===== Header Scroll Effect =====
function initHeaderScrollEffect() {
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

// ===== Active Navigation Link =====
function initActiveNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  // Update on page load
  updateActiveLink();
}

// ===== Stats Counter Animation =====
function initStatsCounter() {
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;

    statNumbers.forEach((stat) => {
      const target =
        parseInt(stat.getAttribute('data-target')) ||
        parseInt(stat.textContent);
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60 FPS
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        // Format number for display
        let displayValue = Math.floor(current);
        if (stat.textContent.includes('+')) {
          displayValue += '+';
        }
        if (stat.textContent.includes('/')) {
          displayValue = target + '/7'; // For 24/7 display
        }

        stat.textContent = displayValue;
      }, 16);
    });

    statsAnimated = true;
  }

  // Check if stats section is visible
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(statsSection);
  }
}

// ===== FAQ Accordion =====
function initFAQAccordion() {
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all FAQ items
        faqItems.forEach((faqItem) => {
          faqItem.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

// ===== Scroll to Top Button =====
function initScrollToTop() {
  // Create scroll to top button
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.setAttribute('aria-label', 'العودة إلى الأعلى');

  // Add styles
  scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    `;

  document.body.appendChild(scrollBtn);

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.visibility = 'visible';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.visibility = 'hidden';
    }
  });

  // Scroll to top when clicked
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // Add hover effect
  scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'translateY(-3px)';
    scrollBtn.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
  });

  scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'translateY(0)';
    scrollBtn.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
  });
}

// ===== Intersection Observer for Animations =====
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.service-card, .team-member, .reason-item, .vm-item, .info-card'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  animatedElements.forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    observer.observe(element);
  });
}

// ===== Loading Animation =====
function initPageLoading() {
  // Hide loader after page load
  window.addEventListener('load', () => {
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 2000);
    }
  });

  // Preload critical images
  const preloadImages = [
    // Add any critical images here
  ];

  preloadImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// ===== Service Cards Hover Effect =====
function initServiceCardsEffect() {
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// ===== Form Field Enhancements =====
function initFormEnhancements() {
  const formInputs = document.querySelectorAll('input, textarea, select');

  formInputs.forEach((input) => {
    // Add floating label effect
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });

    // Check if field has value on load
    if (input.value) {
      input.parentElement.classList.add('focused');
    }
  });

  // Phone number formatting
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');

      // Format Saudi phone numbers
      if (value.startsWith('966')) {
        value = '+' + value;
      } else if (value.startsWith('05')) {
        value = '+966' + value.substring(1);
      } else if (value.startsWith('5') && value.length === 9) {
        value = '+966' + value;
      }

      e.target.value = value;
    });
  }
}

// ===== Accessibility Enhancements =====
function initAccessibility() {
  // Add keyboard navigation for custom elements
  const interactiveElements = document.querySelectorAll(
    '.faq-question, .service-card, .team-member'
  );

  interactiveElements.forEach((element) => {
    element.setAttribute('tabindex', '0');

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        element.click();
      }
    });
  });

  // Add main landmark if not exists
  // const main = document.querySelector('main');
  // if (!main) {
  //   const heroSection = document.querySelector('.hero, .page-header');
  //   if (heroSection && heroSection.nextElementSibling) {
  //     heroSection.nextElementSibling.setAttribute('id', 'main');
  //   }
  // }
}

// ===== Performance Optimizations =====
function initPerformanceOptimizations() {
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }

  // Prefetch important pages
  const importantLinks = document.querySelectorAll(
    'a[href*="services"], a[href*="contact"], a[href*="about"]'
  );

  importantLinks.forEach((link) => {
    link.addEventListener(
      'mouseenter',
      () => {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = link.href;
        document.head.appendChild(prefetchLink);
      },
      { once: true }
    );
  });
}

// ===== Error Handling =====
function initErrorHandling() {
  window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You can implement error reporting here
  });

  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // You can implement error reporting here
  });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#5fc3ac' : type === 'error' ? '#e74c3c' : '#1f2b7b'
    };
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// ===== Initialize All Functions =====
function init() {
  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }

  // Initialize all modules
  initMobileNavigation();
  initSmoothScrolling();
  initHeaderScrollEffect();
  initActiveNavigation();
  initStatsCounter();
  initFAQAccordion();
  initScrollToTop();
  initScrollAnimations();
  initPageLoading();
  initServiceCardsEffect();
  initFormEnhancements();
  initAccessibility();
  initPerformanceOptimizations();
  initErrorHandling();
}

// ===== DOM Ready =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ===== Export for testing (if needed) =====
window.IbrahimWebsite = {
  init,
  initMobileNavigation,
  initActiveNavigation,
  initFAQAccordion,
  initStatsCounter,
};
