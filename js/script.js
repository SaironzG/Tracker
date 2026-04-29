document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Only apply custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Add a slight delay for the outline for a smooth trailing effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effect for clickable elements
        const clickables = document.querySelectorAll('a, button, .feature-item, .benefit-card, .step-card, .asset-item');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // --- 2. Magnetic Buttons ---
    const magneticButtons = document.querySelectorAll('.btn');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate pull strength
            const pullX = (x - rect.width / 2) * 0.3;
            const pullY = (y - rect.height / 2) * 0.3;
            
            btn.style.transform = `translate(${pullX}px, ${pullY}px) scale(1.05)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px) scale(1)`;
        });
    });

    // --- 3. 3D Tilt Effect for Cards ---
    const tiltCards = document.querySelectorAll('.benefit-card, .step-card, .asset-item');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // --- 4. Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 5. Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- 6. Number Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; 

    const startCounters = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        startCounters.observe(counter);
    });

    // --- 7. Interactive Features List ---
    const featureItems = document.querySelectorAll('.feature-item');
    const featureImg = document.querySelector('.feature-img');
    
    // Simple array of images for the demo
    const featureImages = {
        'realtime': 'images/tracker.jpg',
        'geofence': 'images/tracker2.jpg',
        'history': 'images/Screenshot 2026-04-29 084758.png',
        'security': 'images/tracker.jpg'
    };

    featureItems.forEach(item => {
        item.addEventListener('click', () => {
            featureItems.forEach(f => f.classList.remove('active'));
            item.classList.add('active');
            
            const featureType = item.getAttribute('data-feature');
            
            // Add a slight fade effect when changing images
            featureImg.style.opacity = '0.5';
            setTimeout(() => {
                if(featureImages[featureType]) {
                    featureImg.src = featureImages[featureType];
                }
                featureImg.style.opacity = '1';
            }, 200);
        });
    });

    // --- 8. Parallax Effect on Hero Image ---
    const heroImage = document.querySelector('.hero-image');
    
    if (window.innerWidth > 992 && heroImage) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            
            heroImage.style.transform = `perspective(1000px) rotateY(${xAxis - 5}deg) rotateX(${yAxis}deg)`;
        });
        
        document.querySelector('.hero').addEventListener('mouseleave', () => {
            heroImage.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(0deg)`;
        });
    }
});
