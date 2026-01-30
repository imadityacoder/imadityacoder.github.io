export function initProjects() {
    // ========== PROJECT MODAL ==========
    const projectModal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.getElementById('close-modal');
    // Note: Since we are using modules, this runs after DOM content loaded usually, but buttons might be dynamic?
    // In this case, buttons are static in HTML.

    // Logic to delegate event for View Details buttons if we want, or attach directly.
    // Attaching directly to current DOM elements.
    const viewProjectButtons = document.querySelectorAll('.view-project-btn');

    if (!projectModal || !modalBody || !closeModal) return;

    // Project data
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
            title: "E-Commerce App (Flutter)",
            description: "A full-featured shopping app built with Flutter and Firebase. Clean architecture and state management.",
            image: "assets/project1.jpg",
            technologies: ["Flutter", "Firebase", "Riverpod"],
            features: ["Product listing", "Cart management", "User Auth", "Favorites", "Order History"],
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
            // Find closest project card to get ID
            const projectCard = button.closest('.project-card');
            if (!projectCard) return;

            const projectId = projectCard.dataset.project;
            // Handle new Flutter project case (id=4 in html but data might be missing if I didn't update HTML data attribute? Let's check HTML.
            // HTML for Project 4 has data-project="4". HTML for others has data-project="...".
            // So logic works.

            const project = projectData[projectId];

            if (project) {
                // Generate HTML for array items
                const technologiesHtml = project.technologies.map(tech =>
                    `<span class="tech-tag">${tech}</span>`
                ).join('');

                const featuresHtml = project.features.map(feature => `
                    <li class="flex items-start">
                        <i class="fas fa-check text-primary-500 mt-1 mr-2"></i>
                        <span class="text-gray-600 dark:text-gray-300">${feature}</span>
                    </li>
                `).join('');

                modalBody.innerHTML = `
                    <div class="mb-6">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover rounded-lg mb-4">
                        <h2 class="text-3xl font-bold mb-2">${project.title}</h2>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">${project.description}</p>
                    </div>
                    
                    <div class="mb-6">
                        <h3 class="text-xl font-bold mb-3">Technologies Used</h3>
                        <div class="flex flex-wrap gap-2">
                            ${technologiesHtml}
                        </div>
                    </div>
                    
                    <div class="mb-6">
                        <h3 class="text-xl font-bold mb-3">Key Features</h3>
                        <ul class="grid md:grid-cols-2 gap-2">
                            ${featuresHtml}
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
}
