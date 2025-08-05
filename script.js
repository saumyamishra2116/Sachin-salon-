
// Add these to your existing script.js

// Service page - Package hover effect
const packageCards = document.querySelectorAll('.package-card');
packageCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (card.classList.contains('popular')) {
            card.style.transform = 'scale(1.05)';
        } else {
            card.style.transform = 'translateY(-10px)';
        }
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Contact page - Form input effects
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.querySelector('label').style.color = 'var(--primary-color)';
        this.style.borderColor = 'var(--primary-color)';
    });
    input.addEventListener('blur', function() {
        this.parentElement.querySelector('label').style.color = '';
        this.style.borderColor = '#ddd';
    });
});

// Image lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});

// Dark mode toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

darkModeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// Testimonial slider
const testimonials = [
    {
        name: "Sarah W.",
        text: "The best salon experience I've ever had! My hairstylist listened to exactly what I wanted and delivered beyond my expectations.",
        rating: 5
    },
    {
        name: "James M.",
        text: "As a man who's particular about his haircuts, I can confidently say this salon knows what they're doing. Highly recommend!",
        rating: 5
    },
    {
        name: "Grace K.",
        text: "The ambiance is relaxing, the staff is professional, and my hair has never looked better. Worth every shilling!",
        rating: 5
    }
];

const testimonialSlider = document.querySelector('.testimonial-slider');
let currentTestimonial = 0;

function displayTestimonial(index) {
    const testimonial = testimonials[index];
    const stars = '★'.repeat(testimonial.rating);
    
    testimonialSlider.innerHTML = `
        <div class="testimonial-slide">
            <p>"${testimonial.text}"</p>
            <div class="testimonial-author">
                <h4>${testimonial.name}</h4>
                <div class="rating">${stars}</div>
            </div>
        </div>
    `;
}

displayTestimonial(0);

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    displayTestimonial(currentTestimonial);
}, 5000);

// Scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .featured-services h2');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
document.querySelectorAll('.service-card, .featured-services h2').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);