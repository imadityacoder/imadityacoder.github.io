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
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.nav-link-mobile');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuButton.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when a link is clicked
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuButton.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ========== SMOOTH SCROLL & ACTIVE SECTION HIGHLIGHTING ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// ========== SCROLL REVEAL ANIMATIONS ==========
const revealElements = document.querySelectorAll('.reveal-element');

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        }
    });
}

// Reveal elements on scroll
window.addEventListener('scroll', revealOnScroll);

// Reveal elements on page load
window.addEventListener('load', revealOnScroll);

// ========== SKILL PROGRESS BAR ANIMATION ==========
const skillProgressBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (barTop < windowHeight - 100) {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 100);
        }
    });
}

// Animate skill bars once when they come into view
let skillBarsAnimated = false;
window.addEventListener('scroll', () => {
    if (!skillBarsAnimated) {
        const skillsSection = document.getElementById('skills');
        const skillsTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (skillsTop < windowHeight - 200) {
            animateSkillBars();
            skillBarsAnimated = true;
        }
    }
});

// ========== PROJECT MODAL ==========
const projectModal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.getElementById('close-modal');
const viewProjectButtons = document.querySelectorAll('.view-project-btn');

// Project data for modal
const projectData = {
    1: {
        title: "E-Commerce Platform",
        description: "A comprehensive e-commerce solution built with modern web technologies. Features include user authentication, product management, shopping cart, secure payment processing with Stripe, order tracking, and an admin dashboard for inventory management.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express", "Redux"],
        features: [
            "User authentication and authorization",
            "Product catalog with search and filters",
            "Shopping cart and checkout process",
            "Payment integration with Stripe",
            "Order management and tracking",
            "Admin dashboard for inventory",
            "Real-time inventory updates",
            "Email notifications"
        ],
        demoUrl: "#",
        codeUrl: "#"
    },
    2: {
        title: "Analytics Dashboard",
        description: "A powerful real-time analytics dashboard that visualizes complex data through interactive charts and graphs. Built with Vue.js and D3.js for stunning data visualizations, backed by Python and PostgreSQL for robust data processing.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
        technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL", "Flask", "Chart.js"],
        features: [
            "Real-time data visualization",
            "Interactive charts and graphs",
            "Custom date range selection",
            "Export data to CSV/PDF",
            "Multi-user support",
            "Customizable dashboards",
            "Advanced filtering options",
            "Mobile-responsive design"
        ],
        demoUrl: "#",
        codeUrl: "#"
    },
    3: {
        title: "Task Management App",
        description: "A collaborative task management application designed for teams. Features real-time updates using WebSocket, drag-and-drop functionality, team collaboration tools, and progress tracking. Built with React and Firebase for scalability.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop",
        technologies: ["React", "Firebase", "TailwindCSS", "WebSocket", "React DnD"],
        features: [
            "Real-time collaboration",
            "Drag-and-drop task organization",
            "Team workspaces",
            "Task assignments and due dates",
            "Progress tracking",
            "File attachments",
            "Comments and notifications",
            "Calendar view"
        ],
        demoUrl: "#",
        codeUrl: "#"
    },
    4: {
        title: "Weather Forecast App",
        description: "A beautiful and intuitive weather application that provides accurate forecasts for any location. Features include 7-day forecasts, hourly predictions, interactive weather maps, and location-based automatic updates.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop",
        technologies: ["JavaScript", "OpenWeather API", "Geolocation API", "Chart.js"],
        features: [
            "Current weather conditions",
            "7-day forecast",
            "Hourly predictions",
            "Location-based auto-detection",
            "Search by city name",
            "Weather maps",
            "Temperature graphs",
            "Weather alerts"
        ],
        demoUrl: "#",
        codeUrl: "#"
    },
    5: {
        title: "Social Media Platform",
        description: "A full-featured social networking platform with posts, comments, likes, real-time chat, user profiles, and more. Built with Next.js for server-side rendering, GraphQL for efficient data fetching, and Socket.io for real-time features.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop",
        technologies: ["Next.js", "GraphQL", "MongoDB", "Socket.io", "AWS S3", "Redis"],
        features: [
            "User profiles and authentication",
            "Create and share posts",
            "Like and comment system",
            "Real-time chat messaging",
            "Follow/unfollow users",
            "News feed algorithm",
            "Image and video uploads",
            "Notifications system"
        ],
        demoUrl: "#",
        codeUrl: "#"
    },
    6: {
        title: "Fitness Tracker",
        description: "A comprehensive fitness tracking application for mobile and web. Track workouts, monitor progress, set goals, and get personalized recommendations. Built with React Native for cross-platform mobile support.",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop",
        technologies: ["React Native", "Node.js", "Express", "MySQL", "Redux", "Chart.js"],
        features: [
            "Workout tracking and logging",
            "Progress charts and analytics",
            "Custom workout plans",
            "Exercise library",
            "Goal setting and tracking",
            "Calorie counter",
            "Personal records tracking",
            "Social sharing features"
        ],
        demoUrl: "#",
        codeUrl: "#"
    }
};

// Open modal when "View Details" is clicked
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

// Close modal
closeModal.addEventListener('click', () => {
    projectModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
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
    // Remove active class from all cards and dots
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current card and dot
    testimonialCards[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    currentTestimonial = index;
}

// Next testimonial
nextButton.addEventListener('click', () => {
    const nextIndex = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(nextIndex);
});

// Previous testimonial
prevButton.addEventListener('click', () => {
    const prevIndex = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(prevIndex);
});

// Dot navigation
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto-rotate testimonials every 5 seconds
setInterval(() => {
    const nextIndex = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(nextIndex);
}, 5000);

// ========== CONTACT FORM VALIDATION ==========
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formMessage = document.getElementById('form-message');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, errorId, message) {
    const errorElement = document.getElementById(errorId);
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function hideError(input, errorId) {
    const errorElement = document.getElementById(errorId);
    input.classList.remove('error');
    errorElement.classList.add('hidden');
}

function validateForm() {
    let isValid = true;

    // Validate name
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'name-error', 'Please enter your name');
        isValid = false;
    } else {
        hideError(nameInput, 'name-error');
    }

    // Validate email
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'email-error', 'Please enter your email');
        isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'email-error', 'Please enter a valid email address');
        isValid = false;
    } else {
        hideError(emailInput, 'email-error');
    }

    // Validate message
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'message-error', 'Please enter a message');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'message-error', 'Message must be at least 10 characters long');
        isValid = false;
    } else {
        hideError(messageInput, 'message-error');
    }

    return isValid;
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        // Show success message
        formMessage.className = 'form-success';
        formMessage.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
        formMessage.classList.remove('hidden');

        // Reset form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }
});

// Real-time validation
nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'name-error', 'Please enter your name');
    } else {
        hideError(nameInput, 'name-error');
    }
});

emailInput.addEventListener('blur', () => {
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'email-error', 'Please enter your email');
    } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'email-error', 'Please enter a valid email address');
    } else {
        hideError(emailInput, 'email-error');
    }
});

messageInput.addEventListener('blur', () => {
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'message-error', 'Please enter a message');
    } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'message-error', 'Message must be at least 10 characters long');
    } else {
        hideError(messageInput, 'message-error');
    }
});

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
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== EXPERIENCE TIMELINE ANIMATION ==========
const experienceItems = document.querySelectorAll('.experience-item');

function animateTimeline() {
    experienceItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (itemTop < windowHeight - 100) {
            setTimeout(() => {
                item.classList.add('revealed');
            }, index * 100);
        }
    });
}

window.addEventListener('scroll', animateTimeline);
window.addEventListener('load', animateTimeline);

// ========== SMOOTH HEADER BACKGROUND ON SCROLL ==========
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
    }
});

// ========== INITIALIZE ON PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial scroll reveal
    revealOnScroll();
    highlightActiveSection();
    animateTimeline();

    console.log('Portfolio website loaded successfully!');
});
