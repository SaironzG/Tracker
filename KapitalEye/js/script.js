document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Scroll Reveal Animations (Intersection Observer) ---
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

    // --- 3. Number Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const startCounters = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    
                    // Lower inc to slow and higher to speed up
                    const inc = target / speed;

                    // Check if target is reached
                    if (count < target) {
                        // Add inc to count and output in counter
                        counter.innerText = Math.ceil(count + inc);
                        // Call function every ms
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

    // --- 4. Interactive Features List ---
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all
            featureItems.forEach(f => f.classList.remove('active'));
            // Add to clicked
            item.classList.add('active');
            
            // In a full implementation, this would trigger different animations 
            // in the .visual-container map abstract.
            const featureType = item.getAttribute('data-feature');
            console.log(`Switched to feature visual: ${featureType}`);
            
            // Quick visual feedback on the radar
            const radarCircle = document.querySelector('.radar-circle');
            radarCircle.style.borderColor = 'rgba(245, 158, 11, 0.5)'; // Flash gold
            setTimeout(() => {
                radarCircle.style.borderColor = 'rgba(37, 99, 235, 0.2)'; // Back to blue
            }, 300);
        });
    });

    // --- 5. Parallax Effect on Hero Image ---
    const heroImage = document.querySelector('.hero-image');
    
    if (window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            
            heroImage.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        // Reset on mouse leave
        document.querySelector('.hero').addEventListener('mouseleave', () => {
            heroImage.style.transform = `perspective(1000px) rotateY(-10deg) rotateX(0deg)`;
        });
    }

    // --- 6. Form Submission (Prevent default for demo) ---
    const form = document.querySelector('.glass-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = "Processing...";
        btn.style.backgroundColor = "#10b981"; // Success green
        
        setTimeout(() => {
            btn.innerText = "Message Sent!";
            form.reset();
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = "";
            }, 3000);
        }, 1500);
    });
});
