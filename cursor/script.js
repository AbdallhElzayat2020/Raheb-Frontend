// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
 hamburger.classList.toggle('active');
 navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
 hamburger.classList.remove('active');
 navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
 anchor.addEventListener('click', function (e) {
  e.preventDefault();
  const target = document.querySelector(this.getAttribute('href'));
  if (target) {
   target.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
   });
  }
 });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
 const header = document.querySelector('.header');
 if (window.scrollY > 100) {
  header.style.background = 'rgba(255, 255, 255, 0.98)';
  header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
 } else {
  header.style.background = 'rgba(255, 255, 255, 0.95)';
  header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
 }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
 let current = '';
 const sections = document.querySelectorAll('section');

 sections.forEach(section => {
  const sectionTop = section.offsetTop;
  const sectionHeight = section.clientHeight;
  if (scrollY >= (sectionTop - 200)) {
   current = section.getAttribute('id');
  }
 });

 document.querySelectorAll('.nav-link').forEach(link => {
  link.classList.remove('active');
  if (link.getAttribute('href') === `#${current}`) {
   link.classList.add('active');
  }
 });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
 contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const message = formData.get('message');

  // Simple validation
  if (!name || !email || !message) {
   showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
   return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
   showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
   return;
  }

  // Simulate form submission
  showNotification('جاري إرسال رسالتك...', 'info');

  setTimeout(() => {
   showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
   this.reset();
  }, 2000);
 });
}

// Notification system
function showNotification(message, type = 'info') {
 // Remove existing notifications
 const existingNotifications = document.querySelectorAll('.notification');
 existingNotifications.forEach(notification => notification.remove());

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
        background: ${type === 'success' ? '#5fc3ac' : type === 'error' ? '#e74c3c' : '#1f2b7b'};
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

// Intersection Observer for animations
const observerOptions = {
 threshold: 0.1,
 rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
  if (entry.isIntersecting) {
   entry.target.classList.add('fade-in-up');
  }
 });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
 const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item, .contact-item');
 animateElements.forEach(el => {
  observer.observe(el);
 });
});

// Counter animation for stats
function animateCounters() {
 const counters = document.querySelectorAll('.stat-number');

 counters.forEach(counter => {
  const target = parseInt(counter.textContent.replace(/\D/g, ''));
  const increment = target / 100;
  let current = 0;

  const updateCounter = () => {
   if (current < target) {
    current += increment;
    counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
    requestAnimationFrame(updateCounter);
   } else {
    counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
   }
  };

  updateCounter();
 });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
 const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
   if (entry.isIntersecting) {
    animateCounters();
    statsObserver.unobserve(entry.target);
   }
  });
 }, { threshold: 0.5 });

 statsObserver.observe(statsSection);
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
 let i = 0;
 element.innerHTML = '';

 function type() {
  if (i < text.length) {
   element.innerHTML += text.charAt(i);
   i++;
   setTimeout(type, speed);
  }
 }

 type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
 const heroTitle = document.querySelector('.hero-title');
 if (heroTitle) {
  const originalText = heroTitle.textContent;
  setTimeout(() => {
   typeWriter(heroTitle, originalText, 80);
  }, 1000);
 }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
 const scrolled = window.pageYOffset;
 const heroGraphic = document.querySelector('.hero-graphic');
 const aboutGraphic = document.querySelector('.about-graphic');

 if (heroGraphic) {
  heroGraphic.style.transform = `translateY(${scrolled * 0.1}px)`;
 }

 if (aboutGraphic) {
  aboutGraphic.style.transform = `translateY(${scrolled * -0.1}px)`;
 }
});

// Service cards hover effect
document.querySelectorAll('.service-card').forEach(card => {
 card.addEventListener('mouseenter', function () {
  this.style.transform = 'translateY(-10px) scale(1.02)';
 });

 card.addEventListener('mouseleave', function () {
  this.style.transform = 'translateY(0) scale(1)';
 });
});

// Portfolio items click effect
document.querySelectorAll('.portfolio-item').forEach(item => {
 item.addEventListener('click', function () {
  this.style.transform = 'scale(0.98)';
  setTimeout(() => {
   this.style.transform = 'scale(1)';
  }, 150);
 });
});

// Add loading animation
window.addEventListener('load', () => {
 document.body.classList.add('loaded');

 // Add loaded class styles
 const style = document.createElement('style');
 style.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #1f2b7b, #5fc3ac);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        body:not(.loaded)::after {
            content: 'جاري التحميل...';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 1.5rem;
            font-weight: 600;
            z-index: 10000;
        }
    `;
 document.head.appendChild(style);
});

// Add active class to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
 link.addEventListener('click', function () {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  this.classList.add('active');
 });
});

// Add CSS for active navigation link
const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeLinkStyle);
