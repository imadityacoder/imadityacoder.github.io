const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const outputFile = path.join(__dirname, '../index.html');

// Map of placeholders to file paths
const components = {
    'COMPONENT: NAVBAR': 'components/navbar.html',
    'SECTION: HERO': 'sections/hero.html',
    'SECTION: ABOUT': 'sections/about.html',
    'SECTION: SKILLS': 'sections/skills.html',
    'SECTION: PROJECTS': 'sections/projects.html',
    'COMPONENT: MODAL': 'components/modal.html',
    'SECTION: EXPERIENCE': 'sections/experience.html',
    'SECTION: TESTIMONIALS': 'sections/testimonials.html',
    'SECTION: CONTACT': 'sections/contact.html',
    'COMPONENT: FOOTER': 'components/footer.html',
    'COMPONENT: BACK_TO_TOP': 'components/back_to_top.html',
};

function build() {
    console.log('Building index.html...');

    // Read template
    let template = fs.readFileSync(path.join(srcDir, 'template.html'), 'utf-8');

    // Replace placeholders
    for (const [placeholder, filePath] of Object.entries(components)) {
        const fullPath = path.join(srcDir, filePath);
        if (fs.existsSync(fullPath)) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            template = template.replace(`<!-- {{ ${placeholder} }} -->`, content);
        } else {
            console.warn(`Warning: Component file not found: ${filePath}`);
        }
    }

    // Write output
    fs.writeFileSync(outputFile, template);
    console.log('Successfully built index.html!');
}

build();
