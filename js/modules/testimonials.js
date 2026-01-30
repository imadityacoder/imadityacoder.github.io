export function initTestimonials() {
    // ========== TESTIMONIALS CAROUSEL ==========
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    const testimonialDots = document.querySelectorAll('.carousel-dot');

    if (testimonialCards.length === 0) return;

    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));

        testimonialCards[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const nextIndex = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(nextIndex);
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            const prevIndex = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
            showTestimonial(prevIndex);
        });
    }

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    // Auto-scroll
    setInterval(() => {
        const nextIndex = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(nextIndex);
    }, 5000);
}
