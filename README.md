# 🚀 Adipage - Modern Portfolio Website

![Project Banner](https://imadityacoder.github.io/screenshot.png)

<div align="center">

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

</div>

---

## ✨ Overview

**Adipage** is a high-performance, responsive, and visually stunning personal portfolio website designed for modern developers. It features a custom **Static Site Generation (SSG)** workflow, creating a seamless development experience while delivering a lightning-fast production build.

Built with meaningful interactions, a robust dark mode, and a modular architecture, this project serves as a perfect template for showcasing skills, projects, and professional experience.

## 🎨 Key Features

-   **💎 Modern UI/UX**: Clean, glassmorphism-inspired design with smooth gradients and typography.
-   **📱 Fully Responsive**: Optimized for all devices, from ultra-wide desktops to mobile phones.
-   **🌙 Dark Mode**: First-class dark mode support with a convenient toggle and system preference detection.
-   **🏗️ Modular Architecture**:
    -   **HTML**: Split into reusable components (`navbar`, `footer`) and sections (`hero`, `about`).
    -   **CSS**: Organized using modern ITCSS-like structure with separate modules.
    -   **JS**: ES6 Modules for clean, maintainable logic.
-   **⚡ Custom SSG Build**: A lightweight Node.js script compiles the modular source files into a single, optimized `index.html`.
-   **🎭 Animations**: Subtle, scroll-triggered reveal animations and interactive hover effects.

## 🛠️ Tech Stack

-   **Core**: Semantic HTML5, Vanilla JavaScript (ES6+)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (CDN for development speed, configurable) + Custom CSS Modules
-   **Build System**: Custom Node.js Script (`scripts/build.js`)
-   **Icons**: [Font Awesome 6](https://fontawesome.com/)
-   **Fonts**: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)

## 📂 Project Structure

```bash
├── 📁 css/                 # Modular CSS files
│   ├── main.css           # Main entry point (imports all others)
│   ├── base.css           # Variables & Reset
│   ├── components.css     # Buttons, Cards, Modals
│   └── sections/          # Section-specific styles
├── 📁 js/                  # ES6 JavaScript Modules
│   ├── main.js            # Main entry point
│   └── modules/           # Logic for Navbar, Projects, etc.
├── 📁 scripts/             # Build scripts
│   └── build.js           # Compiles src/ to index.html
├── 📁 src/                 # Source HTML files
│   ├── template.html      # Master layout template
│   ├── 📁 components/     # Reusable UI (Navbar, Footer, Modal)
│   └── 📁 sections/       # Content Sections (Hero, About, etc.)
├── 📄 index.html           # GENERATED OUTPUT (Do not edit directly)
└── 📄 README.md            # Project Documentation
```

## 🚀 Getting Started

### Prerequisites

-   **Node.js** (Installed to run the build script)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/imadityacoder/imadityacoder.github.io.git
    cd imadityacoder.github.io
    ```

2.  **No dependencies install needed** (Standard library only).

### Development Workflow

1.  **Edit Content**:
    Modify files in `src/sections/` or `src/components/`.
    *Example: To update your bio, edit `src/sections/about.html`.*

2.  **Edit Styles**:
    Modify CSS files in `css/`.
    *Example: To change button styles, edit `css/components.css`.*

3.  **Build the Project**:
    Run the build script to generate the new `index.html`.
    ```bash
    node scripts/build.js
    ```

4.  **Preview**:
    Open `index.html` in your browser or use a live server extension.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/imadityacoder/imadityacoder.github.io/issues).

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Aditya Kumar](https://github.com/imadityacoder)**

</div>
