export function initSkills() {
    // ========== SKILL PROGRESS BAR ANIMATION ==========
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');

    if (!skillsSection) return;

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const targetWidth = bar.style.width;
                    bar.style.width = '0%';
                    // Force reflow
                    void bar.offsetWidth;
                    bar.style.width = targetWidth;
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsSection);
}
