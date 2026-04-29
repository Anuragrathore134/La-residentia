// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Smooth scrolling for all anchors
document.querySelectorAll('.scroll-btn').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Counter animations
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100; // Adjust for speed
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

// Gallery slider logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const sliderTrack = document.querySelector('.slider-track');
let slideInterval;

function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

// Event listeners for slider controls
document.querySelector('.nav-btn.next').addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

document.querySelector('.nav-btn.prev').addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

// Auto-slide functionality
function startInterval() {
    slideInterval = setInterval(nextSlide, 4000);
}

function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
}

// Form submission handler
document.getElementById('leadForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // UI Feedback
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
    submitBtn.disabled = true;
    
    // Simulate API call & Redirect
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Booked Successfully!';
        submitBtn.style.background = '#25D366'; // Turn button green
        submitBtn.style.boxShadow = 'none';
        
        const name = formData.get('name');
        const phone = formData.get('phone');
        
        setTimeout(() => {
            // WhatsApp API redirect
            window.open(`https://wa.me/917291925050?text=Hi, I just booked a site visit for La Residentia.%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}`);
        }, 1500);
        
        // Reset form state
        setTimeout(() => {
            e.target.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = ''; // Revert to gradient
            submitBtn.disabled = false;
        }, 3000);
    }, 2000);
});

// Intersection Observer for scroll animations (Cards & Form)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Initialize everything on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Start slider
    startInterval();
    
    // Observe specific sections for scroll-in effects
    document.querySelectorAll('.card-3d, .pricing-card, .booking-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        observer.observe(el);
    });
    
    // Trigger hero counters immediately on load
    setTimeout(animateCounters, 800);
    
    // Restrict phone input to numbers
    document.querySelector('input[name="phone"]').addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) value = value.slice(0, 10);
        e.target.value = value;
    });

    // Handle hash links on direct load
    if (location.hash === '#booking-form') {
        setTimeout(() => {
            document.querySelector('#booking-form').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 500);
    }
});