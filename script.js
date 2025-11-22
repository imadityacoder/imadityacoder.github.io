// ========================================
// PORTFOLIO WEBSITE - INTERACTIVE FEATURES
// ========================================

// ========== THEME TOGGLE (DARK/LIGHT MODE) ==========
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
html.classList.toggle('dark', currentTheme === 'dark');

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const theme = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// ========== MOBILE MENU TOGGLE ==========
// ========== MOBILE MENU TOGGLE ==========
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileMenuLinks = document.querySelectorAll('.nav-link-mobile');
const body = document.body;

function toggleMenu() {
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

mobileMenuButton.addEventListener('click', toggleMenu);

// Close menu when clicking overlay
mobileMenuOverlay.addEventListener('click', toggleMenu);

// Close menu when clicking close button
const mobileMenuClose = document.getElementById('mobile-menu-close');
if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', toggleMenu);
}

// Close mobile menu when a link is clicked
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) {
            toggleMenu();
        }
    });
});

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
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
// Automatically add delay classes to children of grids
const grids = document.querySelectorAll('.stagger-grid');
grids.forEach(grid => {
    const children = grid.children;
    Array.from(children).forEach((child, index) => {
        // Add delay based on index (up to 5 items, then cycle)
        const delay = ((index % 5) + 1) * 100;
        child.style.transitionDelay = `${delay}ms`;
    });
});

// ========== ACTIVE SECTION HIGHLIGHTING (INTERSECTION OBSERVER) ==========
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

// ========== SKILL PROGRESS BAR ANIMATION ==========
const skillsSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('.skill-progress');

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

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ========== TYPING EFFECT ==========
const typingElement = document.querySelector('.typing-text');
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

// Start typing effect if element exists
if (document.querySelector('.typing-text')) {
    setTimeout(typeEffect, 1000);
}

// ========== 3D TILT EFFECT ==========
const tiltCards = document.querySelectorAll('.project-card, .skill-card');

tiltCards.forEach(card => {
    card.classList.add('tilt-card'); // Add CSS class for 3D context

    card.addEventListener('mousemove', (e) => {
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
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ========== HERO PARALLAX MOUSE EFFECT ==========
document.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.animate-blob');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 20;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// ========== PROJECT MODAL (UNCHANGED LOGIC, KEPT FOR FUNCTIONALITY) ==========
const projectModal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.getElementById('close-modal');
const viewProjectButtons = document.querySelectorAll('.view-project-btn');

// Project data for modal (Same as before)
const projectData = {
    1: {
        title: "E-Commerce Platform",
        description: "A comprehensive e-commerce solution built with modern web technologies. Features include user authentication, product management, shopping cart, secure payment processing with Stripe, order tracking, and an admin dashboard for inventory management.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express", "Redux"],
        features: ["User authentication", "Product catalog", "Shopping cart", "Stripe payments", "Order tracking", "Admin dashboard"],
        demoUrl: "#",
        codeUrl: "#"
    },
    2: {
        title: "Analytics Dashboard",
        description: "A powerful real-time analytics dashboard that visualizes complex data through interactive charts and graphs. Built with Vue.js and D3.js for stunning data visualizations.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
        technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL", "Flask"],
        features: ["Real-time visualization", "Interactive charts", "Date filtering", "Data export", "Multi-user support"],
        demoUrl: "#",
        codeUrl: "#"
    },
    3: {
        title: "Task Management App",
        description: "A collaborative task management application designed for teams. Features real-time updates using WebSocket, drag-and-drop functionality, and team collaboration tools.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop",
        technologies: ["React", "Firebase", "TailwindCSS", "WebSocket"],
        features: ["Real-time collaboration", "Drag-and-drop", "Team workspaces", "Task assignments", "Progress tracking"],
        demoUrl: "#",
        codeUrl: "#"
    },
    4: {
        title: "Weather Forecast App",
        description: "A beautiful and intuitive weather application that provides accurate forecasts for any location. Features include 7-day forecasts and interactive maps.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop",
        technologies: ["JavaScript", "OpenWeather API", "Geolocation API"],
        features: ["Current weather", "7-day forecast", "Hourly predictions", "Location detection", "Weather maps"],
        demoUrl: "#",
        codeUrl: "#"
    },
    5: {
        title: "Social Media Platform",
        description: "A full-featured social networking platform with posts, comments, likes, real-time chat, user profiles, and more.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop",
        technologies: ["Next.js", "GraphQL", "MongoDB", "Socket.io"],
        features: ["User profiles", "Posts & Comments", "Real-time chat", "Follow system", "Notifications"],
        demoUrl: "#",
        codeUrl: "#"
    },
    6: {
        title: "Fitness Tracker",
        description: "A comprehensive fitness tracking application for mobile and web. Track workouts, monitor progress, set goals, and get personalized recommendations.",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop",
        technologies: ["React Native", "Node.js", "Express", "MySQL"],
        features: ["Workout tracking", "Progress charts", "Custom plans", "Exercise library", "Goal setting"],
        demoUrl: "#",
        codeUrl: "#"
    }
};

viewProjectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectCard = button.closest('.project-card');
        const projectId = projectCard.dataset.project;
        const project = projectData[projectId];

        if (project) {
            modalBody.innerHTML = `
                <div class="mb-6">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover rounded-lg mb-4">
                    <h2 class="text-3xl font-bold mb-2">${project.title}</h2>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">${project.description}</p>
                </div>
                
                <div class="mb-6">
                    <h3 class="text-xl font-bold mb-3">Technologies Used</h3>
                    <div class="flex flex-wrap gap-2">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="mb-6">
                    <h3 class="text-xl font-bold mb-3">Key Features</h3>
                    <ul class="grid md:grid-cols-2 gap-2">
                        ${project.features.map(feature => `
                            <li class="flex items-start">
                                <i class="fas fa-check text-primary-500 mt-1 mr-2"></i>
                                <span class="text-gray-600 dark:text-gray-300">${feature}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="flex gap-4">
                    <a href="${project.demoUrl}" class="btn-primary flex-1">
                        <i class="fas fa-external-link-alt mr-2"></i>View Live Demo
                    </a>
                    <a href="${project.codeUrl}" class="btn-secondary flex-1">
                        <i class="fab fa-github mr-2"></i>View Source Code
                    </a>
                </div>
            `;
            projectModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    });
});

closeModal.addEventListener('click', () => {
    projectModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// ========== TESTIMONIALS CAROUSEL ==========
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevButton = document.getElementById('prev-testimonial');
const nextButton = document.getElementById('next-testimonial');
const testimonialDots = document.querySelectorAll('.carousel-dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    testimonialCards[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    currentTestimonial = index;
}

nextButton.addEventListener('click', () => {
    const nextIndex = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(nextIndex);
});

prevButton.addEventListener('click', () => {
    const prevIndex = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(prevIndex);
});

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
});

setInterval(() => {
    const nextIndex = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(nextIndex);
}, 5000);

// ========== CONTACT FORM (UNCHANGED) ==========
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simple simulation
        formMessage.className = 'form-success';
        formMessage.textContent = 'Thank you! Your message has been sent successfully.';
        formMessage.classList.remove('hidden');
        contactForm.reset();
        setTimeout(() => formMessage.classList.add('hidden'), 5000);
    });
}

// ========== BACK TO TOP BUTTON ==========
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== SMOOTH HEADER BACKGROUND ==========
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio upgraded with advanced animations!');
});
