// ===== ANIMATIONS JAVASCRIPT ===== 

// Initialize AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }

    // Initialize custom animations
    initCustomAnimations();
    
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Initialize typing animation
    initTypingAnimation();
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize counter animations
    initCounterAnimations();
    
    // Initialize particle effects
    initParticleEffects();

    // Modern Hero Section Interactions
    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const bookingForm = document.querySelector('.booking-form');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabBtns.forEach(tab => tab.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Update form based on vehicle type
            const vehicleType = this.getAttribute('data-vehicle');
            updateBookingForm(vehicleType);
        });
    });
    
    function updateBookingForm(vehicleType) {
        const searchBtn = document.querySelector('.btn-search span');
        switch(vehicleType) {
            case 'car':
                searchBtn.textContent = 'Search Available Cars';
                break;
            case 'van':
                searchBtn.textContent = 'Search Available Vans';
                break;
            case 'bike':
                searchBtn.textContent = 'Search Available Bikes';
                break;
            case 'luxury':
                searchBtn.textContent = 'Search Luxury Vehicles';
                break;
        }
    }
    
    // Smooth scroll for explore button
    const exploreBtn = document.querySelector('.btn-explore');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const carsSection = document.querySelector('.cars-bikes');
            if (carsSection) {
                carsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Video modal for watch button
    const watchBtn = document.querySelector('.btn-watch');
    if (watchBtn) {
        watchBtn.addEventListener('click', function() {
            // Create modal for video
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="modal-overlay">
                    <div class="modal-content">
                        <button class="modal-close">&times;</button>
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                                    frameborder="0" 
                                    allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal functionality
            const closeBtn = modal.querySelector('.modal-close');
            const overlay = modal.querySelector('.modal-overlay');
            
            closeBtn.addEventListener('click', () => modal.remove());
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) modal.remove();
            });
        });
    }
    
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const targetValue = parseInt(stat.textContent);
                animateNumber(stat, 0, targetValue, 2000);
                statsObserver.unobserve(stat);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => statsObserver.observe(stat));
    
    function animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const startValue = start;
        const change = end - start;
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.floor(startValue + (change * progress));
            element.textContent = currentValue + (element.textContent.includes('+') ? '+' : '');
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
    
    // Form submission
    const bookingFormElement = document.querySelector('.booking-form');
    if (bookingFormElement) {
        bookingFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const pickupLocation = this.querySelector('input[placeholder*="pickup"]').value;
            const dropoffLocation = this.querySelector('input[placeholder*="drop-off"]').value;
            const pickupDate = this.querySelector('input[type="date"]:first-of-type').value;
            const returnDate = this.querySelector('input[type="date"]:last-of-type').value;
            
            // Validate form
            if (!pickupLocation || !dropoffLocation || !pickupDate || !returnDate) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Simulate search
            showNotification('Searching for available vehicles...', 'info');
            
            setTimeout(() => {
                showNotification('Found 15 available vehicles!', 'success');
                // Scroll to cars section
                const carsSection = document.querySelector('.cars-bikes');
                if (carsSection) {
                    carsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 2000);
        });
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 3000);
        }, 3000);
    }
});

// Add CSS for video modal and notifications
const style = document.createElement('style');
style.textContent = `
    .video-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-content {
        position: relative;
        width: 90%;
        max-width: 800px;
        background: white;
        border-radius: 15px;
        overflow: hidden;
    }
    
    .modal-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 20px;
        cursor: pointer;
        z-index: 1;
    }
    
    .video-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
    }
    
    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 10px;
        padding: 15px 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 10000;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-success {
        border-left: 4px solid #28a745;
    }
    
    .notification-error {
        border-left: 4px solid #dc3545;
    }
    
    .notification-info {
        border-left: 4px solid #17a2b8;
    }
    
    .notification-success i {
        color: #28a745;
    }
    
    .notification-error i {
        color: #dc3545;
    }
    
    .notification-info i {
        color: #17a2b8;
    }
`;
document.head.appendChild(style);

// ===== CUSTOM ANIMATIONS =====
function initCustomAnimations() {
    // Add animation classes to elements on page load
    const animatedElements = document.querySelectorAll('.animate-on-load');
    
    animatedElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate-fade-in-up');
        }, index * 200);
    });
    
    // Add staggered animations to lists
    const staggeredLists = document.querySelectorAll('.stagger-list');
    
    staggeredLists.forEach(list => {
        const items = list.querySelectorAll('li, .stagger-item');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            item.classList.add('stagger-item');
        });
    });
}



// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    scrollElements.forEach(element => {
        observer.observe(element);
    });
    
    // Staggered scroll animations
    const staggeredContainers = document.querySelectorAll('.stagger-container');
    
    staggeredContainers.forEach(container => {
        const items = container.querySelectorAll('.stagger-item');
        
        const containerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.stagger-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        containerObserver.observe(container);
    });
}

// ===== HOVER EFFECTS =====
function initHoverEffects() {
    // Add hover classes to elements
    const hoverElements = document.querySelectorAll('.card, .btn, .nav-link, .social-icon');
    
    hoverElements.forEach(element => {
        if (element.classList.contains('card')) {
            element.classList.add('hover-lift');
        } else if (element.classList.contains('btn')) {
            element.classList.add('hover-scale');
        } else if (element.classList.contains('nav-link')) {
            // Nav links already have hover effects in CSS
        } else if (element.classList.contains('social-icon')) {
            element.classList.add('hover-scale');
        }
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.classList.add('animate-typing');
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== COUNTER ANIMATIONS =====
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = parseInt(counter.dataset.duration) || 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===== PARTICLE EFFECTS =====
function initParticleEffects() {
    const particleContainers = document.querySelectorAll('.particle-container');
    
    particleContainers.forEach(container => {
        createParticles(container);
    });
}

function createParticles(container) {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation duration
        const duration = Math.random() * 3 + 2;
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(particle);
    }
}

// ===== UTILITY FUNCTIONS =====

// Add animation class to element
function animateElement(element, animationClass, delay = 0) {
    setTimeout(() => {
        element.classList.add(animationClass);
    }, delay);
}

// Remove animation class from element
function removeAnimation(element, animationClass, delay = 0) {
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, delay);
}

// Toggle animation class
function toggleAnimation(element, animationClass) {
    element.classList.toggle(animationClass);
}

// Add animation on scroll
function addScrollAnimation(element, animationClass, threshold = 0.1) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
            }
        });
    }, { threshold });
    
    observer.observe(element);
}

// Add staggered animation to list
function addStaggeredAnimation(container, animationClass, delay = 100) {
    const items = container.querySelectorAll('li, .stagger-item');
    
    items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add(animationClass);
        }, index * delay);
    });
}

// ===== SPECIAL EFFECTS =====

// Add floating effect to elements
function addFloatingEffect(elements) {
    elements.forEach((element, index) => {
        element.style.animationDelay = (index * 0.2) + 's';
        element.classList.add('animate-float');
    });
}

// Add pulse effect to elements
function addPulseEffect(elements) {
    elements.forEach(element => {
        element.classList.add('animate-pulse');
    });
}

// Add glow effect to elements
function addGlowEffect(elements) {
    elements.forEach(element => {
        element.classList.add('animate-pulse-glow');
    });
}

// Add wave effect to elements
function addWaveEffect(elements) {
    elements.forEach((element, index) => {
        element.style.animationDelay = (index * 0.1) + 's';
        element.classList.add('animate-wave');
    });
}

// ===== PAGE TRANSITIONS =====

// Add page transition effect
function addPageTransition() {
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition';
    document.body.appendChild(transitionOverlay);
    
    setTimeout(() => {
        transitionOverlay.classList.add('active');
    }, 100);
    
    setTimeout(() => {
        transitionOverlay.classList.remove('active');
        setTimeout(() => {
            transitionOverlay.remove();
        }, 500);
    }, 1000);
}

// ===== MOBILE OPTIMIZATIONS =====

// Disable animations on mobile for better performance
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        const animatedElements = document.querySelectorAll('.animate-float, .animate-float-slow');
        animatedElements.forEach(element => {
            element.style.animation = 'none';
        });
    }
}

// Call mobile optimization on resize
window.addEventListener('resize', optimizeForMobile);

// ===== PERFORMANCE MONITORING =====

// Monitor animation performance
function monitorAnimationPerformance() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function countFrames(currentTime) {
        frameCount++;
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            if (fps < 30) {
                // Disable heavy animations if FPS is low
                const heavyAnimations = document.querySelectorAll('.animate-float, .animate-pulse, .particle');
                heavyAnimations.forEach(element => {
                    element.style.animation = 'none';
                });
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(countFrames);
    }
    
    requestAnimationFrame(countFrames);
}

// Start performance monitoring
monitorAnimationPerformance();

// ===== EXPORT FUNCTIONS =====
window.AnimationUtils = {
    animateElement,
    removeAnimation,
    toggleAnimation,
    addScrollAnimation,
    addStaggeredAnimation,
    addFloatingEffect,
    addPulseEffect,
    addGlowEffect,
    addWaveEffect,
    addPageTransition,
    optimizeForMobile
};

window.addEventListener('load', function() {
  var loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    setTimeout(function() {
      loadingScreen.style.display = 'none';
    }, 5000);
  }
});
