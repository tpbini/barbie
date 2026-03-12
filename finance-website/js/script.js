/* ========================================
   FINANCE COMPANY WEBSITE - JAVASCRIPT
   Modern Professional Finance Template
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize all functions
  initNavigation();
  initScrollReveal();
  initCounters();
  initTestimonialsSlider();
  initServiceAccordions();
  initBlogFilters();
  initContactForm();
  initFAQAccordion();
  initSmoothScroll();
  hideLoadingScreen();
  
});

/* ========================================
   NAVIGATION
   ======================================== */
function initNavigation() {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  // Sticky header on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
  
  // Active navigation link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ========================================
   SCROLL REVEAL ANIMATIONS
   ======================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealOnScroll = function() {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };
  
  // Trigger on load and scroll
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
}

/* ========================================
   ANIMATED COUNTERS
   ======================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // The lower the slower
  
  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText.replace(/,/g, '').replace(/\+/g, '');
    const increment = target / speed;
    
    if (count < target) {
      counter.innerText = Math.ceil(count + increment).toLocaleString() + (counter.getAttribute('data-suffix') || '');
      setTimeout(() => animateCounter(counter), 10);
    } else {
      counter.innerText = target.toLocaleString() + (counter.getAttribute('data-suffix') || '');
    }
  };
  
  // Start counting when counters are visible
  const observerOptions = {
    threshold: 0.5
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

/* ========================================
   TESTIMONIALS SLIDER
   ======================================== */
function initTestimonialsSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  
  const showSlide = (index) => {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  };
  
  // Dot click events
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
  
  // Auto-advance slides every 5 seconds
  setInterval(() => {
    let nextSlide = (currentSlide + 1) % slides.length;
    showSlide(nextSlide);
  }, 5000);
}

/* ========================================
   SERVICE ACCORDIONS (Services Page)
   ======================================== */
function initServiceAccordions() {
  const serviceCards = document.querySelectorAll('.service-detail-card');
  
  serviceCards.forEach(card => {
    const header = card.querySelector('.service-detail-header');
    
    if (header) {
      header.addEventListener('click', () => {
        const isActive = card.classList.contains('active');
        
        // Close all other cards
        serviceCards.forEach(otherCard => {
          otherCard.classList.remove('active');
        });
        
        // Toggle current card
        if (!isActive) {
          card.classList.add('active');
        }
      });
    }
  });
}

/* ========================================
   BLOG FILTERS (Blog Page)
   ======================================== */
function initBlogFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const blogPosts = document.querySelectorAll('.blog-post');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      // Filter posts
      blogPosts.forEach(post => {
        if (filterValue === 'all' || post.getAttribute('data-category') === filterValue) {
          post.style.display = 'block';
          post.style.animation = 'fadeIn 0.5s ease';
        } else {
          post.style.display = 'none';
        }
      });
    });
  });
}

/* ========================================
   CONTACT FORM VALIDATION
   ======================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate name
    const nameInput = document.getElementById('name');
    if (nameInput && nameInput.value.trim() === '') {
      showError(nameInput, 'Name is required');
      isValid = false;
    } else {
      clearError(nameInput);
    }
    
    // Validate email
    const emailInput = document.getElementById('email');
    if (emailInput && !isValidEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email');
      isValid = false;
    } else {
      clearError(emailInput);
    }
    
    // Validate phone (optional but validate format if provided)
    const phoneInput = document.getElementById('phone');
    if (phoneInput && phoneInput.value.trim() !== '' && !isValidPhone(phoneInput.value)) {
      showError(phoneInput, 'Please enter a valid phone number');
      isValid = false;
    } else if (phoneInput) {
      clearError(phoneInput);
    }
    
    // Validate message
    const messageInput = document.getElementById('message');
    if (messageInput && messageInput.value.trim() === '') {
      showError(messageInput, 'Message is required');
      isValid = false;
    } else {
      clearError(messageInput);
    }
    
    // If form is valid, submit
    if (isValid) {
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = '<p style="color: #27ae60; text-align: center; margin-top: 20px;">Thank you! Your message has been sent successfully.</p>';
      contactForm.appendChild(successMessage);
      
      // Reset form
      contactForm.reset();
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    }
  });
}

function showError(input, message) {
  const formGroup = input.closest('.form-group');
  if (formGroup) {
    formGroup.classList.add('error');
    const errorDisplay = formGroup.querySelector('.error-message');
    if (errorDisplay) {
      errorDisplay.textContent = message;
    }
  }
}

function clearError(input) {
  const formGroup = input.closest('.form-group');
  if (formGroup) {
    formGroup.classList.remove('error');
  }
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidPhone(phone) {
  const re = /^[\d\s\-\+\(\)]{10,}$/;
  return re.test(phone);
}

/* ========================================
   FAQ ACCORDION (Contact Page)
   ======================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ========================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ======================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed header
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* ========================================
   LOADING SCREEN
   ======================================== */
function hideLoadingScreen() {
  const loadingScreen = document.querySelector('.loading');
  
  if (loadingScreen) {
    // Hide after content loads
    window.addEventListener('load', function() {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
      }, 500);
    });
  }
}

/* ========================================
   CHART.JS INTEGRATION (Optional)
   ======================================== */
function initInvestmentChart() {
  const chartCanvas = document.getElementById('investmentChart');
  
  if (!chartCanvas || typeof Chart === 'undefined') return;
  
  const ctx = chartCanvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [{
        label: 'Portfolio Growth',
        data: [100000, 125000, 150000, 185000, 220000, 265000],
        borderColor: '#004e98',
        backgroundColor: 'rgba(0, 78, 152, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function(value) {
              return '$' + value.toLocaleString();
            }
          }
        }
      }
    }
  });
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Format number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

console.log('Finance Website JavaScript loaded successfully!');
