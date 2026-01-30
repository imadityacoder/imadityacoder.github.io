export function initAnimations() {
    // ========== INTERSECTION OBSERVER FOR REVEAL ==========
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal-element').forEach(el => {
        observer.observe(el);
    });

    // ========== STAGGERED ANIMATIONS FOR GRIDS ==========
    const grids = document.querySelectorAll('.stagger-grid');
    grids.forEach(grid => {
        const children = grid.children;
        Array.from(children).forEach((child, index) => {
            // Add delay based on index (up to 5 items, then cycle)
            const delay = ((index % 5) + 1) * 100;
            child.style.transitionDelay = `${delay}ms`;
        });
    });

    // ========== 3D TILT EFFECT ==========
    const tiltCards = document.querySelectorAll('.project-card, .skill-card');

    tiltCards.forEach(card => {
        card.classList.add('tilt-card'); // Add CSS class for 3D context

        card.addEventListener('mousemove', (e) => {
            // Disable tilt on mobile for performance? 
            // Optional: if (window.innerWidth < 768) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            // Use CSS class for reset? No, inline style overrides.
            // Reset to default transform state.
            // NOTE: For Project Cards, we want to respect the hover state transform if needed.
            // But 'tilt' applies to the whole card.
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // ========== HERO PARALLAX MOUSE EFFECT ==========
    document.addEventListener('mousemove', (e) => {
        const blobs = document.querySelectorAll('.animate-blob');
        if (blobs.length === 0) return;

        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}
