export function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.classList.toggle('dark', currentTheme === 'dark');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            const theme = html.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
    }
}
