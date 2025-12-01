// ===================================
// HEALTHCARE PLUS MEDICAL CENTRE
// Main JavaScript File
// ===================================

// ===================================
// DOCUMENT READY & INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initializeYear();
    initializeScrollProgress();
    initializeMobileMenu();
    initializeSmoothScroll();
    initializeHeaderShadow();
    initializeScrollAnimations();
    initializeFormSubmission();
});

// ===================================
// CURRENT YEAR IN FOOTER
// ===================================
function initializeYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===================================
// SCROLL PROGRESS BAR
// ===================================
function initializeScrollProgress() {
    const progressBar = document.getElementById('progress-bar');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ===================================
// MOBILE MENU TOGGLE
// ===================================
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    
    if (!menuToggle || !nav) return;
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
    });
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            nav.classList.remove('open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('open')) {
            nav.classList.remove('open');
        }
    });
}

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
function initializeSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignore empty hash or just '#'
            if (href === '#' || href === '') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });
}

// ===================================
// HEADER SHADOW ON SCROLL
// ===================================
function initializeHeaderShadow() {
    const header = document.getElementById('header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
        }
    });
}

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
function initializeScrollAnimations() {
    // Check if browser supports Intersection Observer
    if (!('IntersectionObserver' in window)) {
        // Fallback: just show all elements
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(function(card) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease ' + (index * 0.1) + 's';
        observer.observe(card);
    });
}

// ===================================
// CONTACT FORM SUBMISSION
// ===================================
function initializeFormSubmission() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const status = document.getElementById('form-status');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        if (!status || !submitButton) return;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate form submission (replace with actual AJAX call in production)
        await new Promise(function(resolve) {
            setTimeout(resolve, 1500);
        });
        
        // Show success message
        status.className = 'form-status success';
        status.style.display = 'block';
        status.textContent = '✓ Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
        
        // Reset form
        contactForm.reset();
        
        // Re-enable button
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        
        // Hide success message after 5 seconds
        setTimeout(function() {
            status.style.display = 'none';
        }, 5000);
    });
}

// ===================================
// BUTTON RIPPLE EFFECT
// ===================================
function initializeButtonRipple() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Style ripple
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Add to button
            this.appendChild(ripple);
            
            // Remove after animation
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    });
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Debounce function to limit how often a function can fire
 * @param {Function} func - The function to debounce
 * @param {Number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function execution
 * @param {Function} func - The function to throttle
 * @param {Number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Optimize scroll event listeners with throttle
if (window.scrollY !== undefined) {
    const optimizedScrollProgress = throttle(function() {
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }
    }, 10);
    
    const optimizedHeaderShadow = throttle(function() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
            }
        }
    }, 10);
}

// ===================================
// CONSOLE MESSAGE (OPTIONAL)
// ===================================
console.log('%c HealthCare Plus Medical Centre ', 'background: #008487; color: white; padding: 10px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;');
console.log('%c Website loaded successfully! ', 'color: #008487; font-size: 12px;');

// ===================================
// EXPORT FOR MODULE SYSTEMS (OPTIONAL)
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeYear,
        initializeScrollProgress,
        initializeMobileMenu,
        initializeSmoothScroll,
        initializeHeaderShadow,
        initializeScrollAnimations,
        initializeFormSubmission,
        initializeButtonRipple,
        debounce,
        throttle
    };

}
