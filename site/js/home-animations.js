document.addEventListener('DOMContentLoaded', () => {
    // --- Hero Section Animation --- 
    const heroH1 = document.querySelector('.hero h1');
    const heroP = document.querySelector('.hero p');
    const heroBtn = document.querySelector('.hero .btn');
    const svgGrid = document.querySelector('.matrix-grid'); // Get the grid container

    if (heroH1 && heroP && heroBtn && svgGrid) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // --- Generate SVG Grid --- 
        const gridSize = 16; // Adjusted: Fewer dots for less density
        const spacing = 400 / gridSize; 
        const circleRadius = 2.5; // Adjusted: Slightly larger dots
        let gridElements = '';
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const cx = spacing / 2 + j * spacing;
                const cy = spacing / 2 + i * spacing;
                gridElements += `<circle cx="${cx}" cy="${cy}" r="${circleRadius}" data-row="${i}" data-col="${j}"/>`;
            }
        }
        svgGrid.innerHTML = gridElements;
        // --- End Grid Generation ---

        if (prefersReducedMotion) {
            // Apply simple fade-in for reduced motion
            anime.set('.hero .h1-word, .hero .p-word, .hero .btn', { opacity: 1 });
            anime.set('.matrix-grid circle', { opacity: 0.5 }); // Just make dots visible
        } else {
            // Prepare H1 & P
            heroH1.innerHTML = heroH1.textContent.split(' ').map(word => `<span class="h1-word">${word}</span>`).join(' ');
            heroP.innerHTML = heroP.textContent.split(' ').map(word => `<span class="p-word">${word}</span>`).join(' ');

            // Ensure text and button elements are initially hidden
            anime.set('.hero .h1-word, .hero .p-word, .hero .btn', { opacity: 0, translateY: 20 }); // Also set initial translateY for consistency
            // Grid circles start hidden via CSS

            // Create the animation timeline
            const tl = anime.timeline({ easing: 'easeOutExpo' });

            tl
            .add({
                targets: '.matrix-grid circle',
                opacity: [
                    { value: 0.7, duration: 40, easing: 'linear' }, // Faster appear
                    { value: 0.1, duration: 1000, easing: 'easeInQuad' } // Fade more distinctly 
                ],
                scale: [
                    { value: 1.25, duration: 100, easing: 'easeOutSine' }, // Even smaller pulse
                    { value: 1, duration: 800, easing: 'easeInQuad' } 
                ],
                delay: anime.stagger(40, { grid: [gridSize, gridSize], from: 'center' }) // Faster grid stagger
            }, 0)
            .add({
                targets: '.hero .h1-word',
                translateY: ['0.8em', 0], // Slightly less travel
                opacity: [0, 1],
                duration: 900, // Slightly faster
                easing: 'spring(1, 80, 11, 0)', // Tweak spring
                delay: anime.stagger(100) // Slightly faster stagger
            }, 200) // Start text a bit earlier after grid starts
            .add({
                targets: '.hero .p-word',
                translateY: [25, 0], // Slightly less travel
                opacity: [0, 1],
                duration: 800, // Slightly faster
                easing: 'spring(1, 75, 13, 0)',
                delay: anime.stagger(50) // Faster stagger
            }, '-=800') // Adjust overlap
            .add({
                targets: '.hero .btn',
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'spring(1, 80, 14, 0)' // Tweak spring
            }, '-=650'); // Adjust overlap
        }
    }
    
    // --- Scroll animations for other sections (e.g., service cards) --- 
    const scrollAnimatedElements = document.querySelectorAll('.service-card, .project-card'); // Add other selectors as needed
    if (scrollAnimatedElements.length > 0) {
         const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Simply make elements visible if motion is reduced
            scrollAnimatedElements.forEach(el => el.style.opacity = 1);
        } else {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15 // Adjust threshold slightly
            };

            const observerCallback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        anime({
                            targets: entry.target,
                            translateY: [40, 0],
                            opacity: [0, 1],
                            duration: 800,
                            easing: 'easeOutExpo',
                            delay: anime.stagger(50) // Stagger if multiple elements animate together
                        });
                        observer.unobserve(entry.target);
                    }
                });
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);
            scrollAnimatedElements.forEach(el => {
                el.style.opacity = 0; // Hide initially
                observer.observe(el);
            });
        }
    }
});
