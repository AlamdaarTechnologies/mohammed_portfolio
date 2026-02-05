document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorBlur.style.left = e.clientX + 'px';
        cursorBlur.style.top = e.clientY + 'px';
    });

    const interactiveElements = document.querySelectorAll('a, button, .logo');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'rgba(0, 243, 255, 0.2)';
            cursor.style.borderColor = 'transparent';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.borderColor = 'var(--primary-color)';
        });
    });

    // Mobile Navigation Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('active');

        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('active');
            links.forEach(l => l.style.animation = '');
        });
    });

    // Tagline Morph Logic
    const taglineText = document.getElementById('tagline-text');
    if (taglineText) {
        const phrases = [
            "BACKEND <span class='highlight'>ENGINEER</span>",
            "CLOUD & <span class='highlight'>SECURITY</span> ENTHUSIAST",
            "<span class='highlight'>SYSTEMS</span> THINKER"
        ];
        let phraseIndex = 0;

        setInterval(() => {
            taglineText.classList.add('text-hidden');

            setTimeout(() => {
                phraseIndex = (phraseIndex + 1) % phrases.length;
                taglineText.innerHTML = phrases[phraseIndex];
                taglineText.style.transition = 'none';
                taglineText.style.transform = 'translateY(12px)';
                void taglineText.offsetWidth; // Force reflow
                taglineText.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                taglineText.classList.remove('text-hidden');
                taglineText.style.transform = 'translateY(0)';
            }, 500);
        }, 3000);
    }

    // Consolidated Intersection Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active', 'reveal');
                if (entry.target.classList.contains('project-panel')) {
                    revealObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.scroll-reveal, .timeline-item, .project-panel').forEach((el, index) => {
        if (el.classList.contains('project-panel')) {
            el.style.transitionDelay = `${(index % 3) * 0.15}s`;
        }
        revealObserver.observe(el);
    });

    // Navigation Active Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    const handleScroll = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
});

// Loading Screen Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(() => loader.remove(), 1000);
        }, 1500); // reduced from 2000 for snappier feel while still showing off
    }
});

