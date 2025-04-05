document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Animate header
    if (!prefersReducedMotion) {
        anime({
            targets: '.subpage-header h1, .subpage-header p',
            translateY: [-20, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutExpo'
        });
    } else {
        anime.set('.subpage-header h1, .subpage-header p', { opacity: 1 });
    }

    // Use Intersection Observer for scroll animations
    const sections = document.querySelectorAll('.content-section');
    
    if (sections.length > 0) {
        if (prefersReducedMotion) {
            sections.forEach(section => section.style.opacity = 1);
        } else {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15 // Trigger when 15% is visible
            };

            const observerCallback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const section = entry.target;
                        
                        // Animate the section itself
                        anime({
                            targets: section,
                            translateY: [50, 0],
                            opacity: [0, 1],
                            duration: 1000,
                            easing: 'easeOutExpo'
                        });

                        // Animate list items within the section
                        anime({
                            targets: section.querySelectorAll('li'),
                            translateX: [-20, 0],
                            opacity: [0, 1],
                            delay: anime.stagger(50, { start: 300 }),
                            duration: 600,
                            easing: 'easeOutExpo'
                        });
                        
                        // Animate workflow diagrams (if they exist)
                        const diagrams = section.querySelectorAll('.workflow-diagram');
                        if (diagrams.length > 0) {
                            anime({
                                targets: diagrams,
                                opacity: [0, 1],
                                scale: [0.95, 1],
                                delay: 500,
                                duration: 800,
                                easing: 'easeOutExpo'
                            });
                        }

                        observer.unobserve(section); // Stop observing once animated
                    }
                });
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);
            sections.forEach(section => {
                section.style.opacity = 0; // Hide initially
                observer.observe(section);
            });
        }
    }
});
