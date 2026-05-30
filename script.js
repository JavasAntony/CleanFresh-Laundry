// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle icon between bars and times
    const icon = mobileMenu.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active link highlighting based on scroll position
    let current = '';
    const sections = document.querySelectorAll('section, footer');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Testimonials Carousel Auto-Scroll & Drag Functionality
document.addEventListener('DOMContentLoaded', () => {
    const testimonialsGrid = document.querySelector('.testimonials-grid');

    if (testimonialsGrid) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let autoScrollInterval;
        let interactionTimeout;

        // Mouse Drag for Desktop
        testimonialsGrid.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialsGrid.classList.add('dragging');
            startX = e.pageX - testimonialsGrid.offsetLeft;
            scrollLeft = testimonialsGrid.scrollLeft;
            stopAutoScroll();
            startInteractionTimeout();
        });

        testimonialsGrid.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialsGrid.classList.remove('dragging');
        });

        testimonialsGrid.addEventListener('mouseup', () => {
            isDown = false;
            testimonialsGrid.classList.remove('dragging');
        });

        testimonialsGrid.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsGrid.offsetLeft;
            const walk = (x - startX) * 1.5; // Scroll speed multiplier
            testimonialsGrid.scrollLeft = scrollLeft - walk;
        });

        // Touch Events for Mobile (Pauses auto scroll on interaction)
        testimonialsGrid.addEventListener('touchstart', () => {
            stopAutoScroll();
            startInteractionTimeout();
        }, { passive: true });

        // Wheel Event detection
        testimonialsGrid.addEventListener('wheel', () => {
            stopAutoScroll();
            startInteractionTimeout();
        }, { passive: true });

        // Auto Scroll Function
        function startAutoScroll() {
            if (autoScrollInterval) return;
            autoScrollInterval = setInterval(() => {
                if (isDown) return;

                const maxScroll = testimonialsGrid.scrollWidth - testimonialsGrid.clientWidth;
                if (testimonialsGrid.scrollLeft >= maxScroll - 10) {
                    // Smoothly scroll back to the starting point
                    testimonialsGrid.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Scroll by one card width (card + gap)
                    const card = testimonialsGrid.querySelector('.testi-card');
                    if (card) {
                        const cardWidth = card.offsetWidth + 30; // card width + gap
                        testimonialsGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
                    }
                }
            }, 3000); // Transitions every 3 seconds
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }

        function startInteractionTimeout() {
            clearTimeout(interactionTimeout);
            interactionTimeout = setTimeout(() => {
                startAutoScroll();
            }, 6000); // Resume auto scroll after 6 seconds of inactivity (idle)
        }

        // Initial launch of auto scroll
        startAutoScroll();
    }
});
