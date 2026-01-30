// ========================================
// MAIN JAVASCRIPT
// Imports and initializes all modules
// ========================================

import { initTheme } from './modules/theme.js';
import { initNavbar } from './modules/navbar.js';
import { initAnimations } from './modules/animations.js';
import { initHero } from './modules/hero.js';
import { initSkills } from './modules/skills.js';
import { initProjects } from './modules/projects.js';
import { initTestimonials } from './modules/testimonials.js';
import { initContact } from './modules/contact.js';
import { initUI } from './modules/ui.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initAnimations();
    initHero();
    initSkills();
    initProjects();
    initTestimonials();
    initContact();
    initUI();

    console.log('Portfolio upgraded with modular architecture!');
});
