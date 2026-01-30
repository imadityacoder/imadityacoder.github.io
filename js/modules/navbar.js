export function initNavbar() {
    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuLinks = document.querySelectorAll('.nav-link-mobile');
    const body = document.body;

    function toggleMenu() {
        if (!mobileMenu || !mobileMenuButton) return;

        const isOpen = mobileMenu.classList.contains('open');
        const icon = mobileMenuButton.querySelector('i');

        if (isOpen) {
            mobileMenu.classList.remove('open');
            mobileMenuOverlay.classList.remove('open');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            body.style.overflow = ''; // Restore scrolling
        } else {
            mobileMenu.classList.add('open');
            mobileMenuOverlay.classList.add('open');
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            body.style.overflow = 'hidden'; // Lock scrolling
        }
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking close button
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', toggleMenu);
    }

    // Close mobile menu when a link is clicked
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // ========== ACTIVE SECTION HIGHLIGHTING ==========
    const sectionObserverOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px', // Trigger when section is near top
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, sectionObserverOptions);

    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });

    // ========== SMOOTH HEADER BACKGROUND ==========
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }
}
