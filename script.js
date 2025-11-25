// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('language') || 'ru';
    
    // Set initial language
    setLanguage(currentLang);
    
    // Language button click handlers
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            setLanguage(lang);
            
            // Update active button
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Save preference
            localStorage.setItem('language', lang);
        });
    });
    
    function setLanguage(lang) {
        // Update text content
        document.querySelectorAll('[data-ru]').forEach(elem => {
            if (lang === 'ru') {
                elem.textContent = elem.dataset.ru;
            } else if (lang === 'ua') {
                elem.textContent = elem.dataset.ua;
            } else if (lang === 'hu') {
                elem.textContent = elem.dataset.hu;
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-ru-placeholder]').forEach(elem => {
            if (lang === 'ru') {
                elem.placeholder = elem.dataset.ruPlaceholder;
            } else if (lang === 'ua') {
                elem.placeholder = elem.dataset.uaPlaceholder;
            } else if (lang === 'hu') {
                elem.placeholder = elem.dataset.huPlaceholder;
            }
        });

        // Update select first option
        document.querySelectorAll('select[data-ru-first]').forEach(elem => {
            if (lang === 'ru') {
                elem.options[0].textContent = elem.dataset.ruFirst;
            } else if (lang === 'ua') {
                elem.options[0].textContent = elem.dataset.uaFirst;
            } else if (lang === 'hu') {
                elem.options[0].textContent = elem.dataset.huFirst;
            }
        });

        // Update HTML lang attribute
        if (lang === 'ua') {
            document.documentElement.lang = 'uk';
        } else if (lang === 'hu') {
            document.documentElement.lang = 'hu';
        } else {
            document.documentElement.lang = 'ru';
        }

        // Update page title
        if (lang === 'ru') {
            document.title = 'TransitBudapest - Пассажирские перевозки в Будапеште';
        } else if (lang === 'ua') {
            document.title = 'TransitBudapest - Пасажирські перевезення в Будапешті';
        } else if (lang === 'hu') {
            document.title = 'TransitBudapest - Személyszállítás Budapesten';
        }
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
});

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Show success message (in production, this would send to a server)
            const currentLang = localStorage.getItem('language') || 'ru';
            let successMessage;
            if (currentLang === 'ru') {
                successMessage = 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.';
            } else if (currentLang === 'ua') {
                successMessage = 'Дякуємо! Вашу заявку надіслано. Ми зв\'яжемося з вами найближчим часом.';
            } else if (currentLang === 'hu') {
                successMessage = 'Köszönjük! Kérését elküldtük. Hamarosan felvesszük Önnel a kapcsolatot.';
            } else {
                successMessage = 'Thank you! Your request has been sent. We will contact you soon.';
            }
            
            alert(successMessage);
            
            // Reset form
            this.reset();
        });
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .fleet-card, .feature');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter animation for features
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = element.textContent.replace(/\d+/, target);
            clearInterval(timer);
        } else {
            element.textContent = element.textContent.replace(/\d+/, Math.floor(start));
        }
    }, 16);
}

// Trigger counter animation when features section is visible
const featuresObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const counters = entry.target.querySelectorAll('.feature-number');
            counters.forEach(counter => {
                const text = counter.textContent;
                const number = parseInt(text.match(/\d+/));
                if (number) {
                    animateCounter(counter, number);
                }
            });
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const featuresSection = document.querySelector('.features');
    if (featuresSection) {
        featuresObserver.observe(featuresSection);
    }
});

// Add loading state for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // If image is already cached
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
});

// Dynamic year in footer
document.addEventListener('DOMContentLoaded', function() {
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const year = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2024', year);
    }
});

// Booking button functionality
document.addEventListener('DOMContentLoaded', function() {
    const bookingButtons = document.querySelectorAll('.btn-primary');

    bookingButtons.forEach(btn => {
        if (btn.textContent.includes('Заказать') || btn.textContent.includes('Замовити') || btn.textContent.includes('foglalás')) {
            btn.addEventListener('click', function(e) {
                if (!this.closest('form')) {
                    e.preventDefault();
                    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
});

// Service card hover effect enhancement
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.service-icon').style.animation = 'bounce 0.5s';
        });
        
        card.addEventListener('mouseleave', function() {
            setTimeout(() => {
                this.querySelector('.service-icon').style.animation = 'bounce 2s infinite';
            }, 500);
        });
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.addEventListener('DOMContentLoaded', function() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    });
}

// Page visibility API to pause animations when page is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations
        document.querySelectorAll('.service-icon').forEach(icon => {
            icon.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations
        document.querySelectorAll('.service-icon').forEach(icon => {
            icon.style.animationPlayState = 'running';
        });
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Print styles optimization
window.addEventListener('beforeprint', function() {
    // Remove animations for printing
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
});

// Scroll to top button (optional enhancement)
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

document.addEventListener('DOMContentLoaded', createScrollToTopButton);

console.log('TransitBudapest website loaded successfully! 🚌');