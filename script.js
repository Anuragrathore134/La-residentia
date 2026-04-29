// Preloader
window.addEventListener('load', () => {
    document.querySelector('.preloader').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.preloader').style.display = 'none';
    }, 500);
});

// Smooth scrolling
document.querySelectorAll('.scroll-btn').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Counter animations
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
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
    });
}

// Gallery slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const sliderTrack = document.querySelector('.slider-track');

function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}

document.querySelector('.nav-btn.next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
});

document.querySelector('.nav-btn.prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
});

// Auto-slide
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}, 4000);

// Countdown timer
function startCountdown() {
    let timeLeft = 10083; // 2h 47m 63s
    
    const timerEl = document.getElementById('countdown');
    const timer = setInterval(() => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        timerEl.textContent = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
        
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timer);
            timerEl.textContent = '00:00:00';
        }
    }, 1000);
}

// Form submission
document.getElementById('leadForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Success animation
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Booked Successfully!';
        
        // WhatsApp redirect
        const phone = formData.get('phone');
        setTimeout(() => {
            window.open(`https://wa.me/919999999999?text=Hi, I just booked a site visit for La Residentia. Name: ${formData.get('name')}, Phone: ${phone}`);
        }, 1500);
        
        // Reset form after 3s
        setTimeout(() => {
            e.target.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
    }, 2000);
    
    // Google Analytics event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'generate_lead', {
            event_category: 'LaResidentia',
            event_label: 'Site Visit Booking'
        });
    }
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Observe sections
document.querySelectorAll('.card-3d, .pricing-card, .booking-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

// Phone input formatting
document.querySelector('input[name="phone"]').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    e.target.value = value;
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    animateUnits();
    
    // Trigger counters on hero visible
    setTimeout(animateCounters, 1000);
    
    // Auto-scroll to form if hash present
    if (location.hash === '#booking-form') {
        setTimeout(() => {
            document.querySelector('#booking-form').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 500);
    }
});