export function initHero() {
    // ========== TYPING EFFECT ==========
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const phrases = ["Flutter Developer", "JEE Aspirant", "Future Engineer", "Tech Enthusiast"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            charIndex--;
            typeSpeed = 50;
        } else {
            charIndex++;
            typeSpeed = 100;
        }

        if (typingElement) {
            typingElement.textContent = currentPhrase.substring(0, charIndex);

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before new word
            }
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect
    setTimeout(typeEffect, 1000);
}
