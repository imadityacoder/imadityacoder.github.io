export function initContact() {
    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitButton.innerHTML;

            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            if (formMessage) formMessage.classList.add('hidden');

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    if (formMessage) {
                        formMessage.className = 'form-success p-3 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 mt-4 text-center';
                        formMessage.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Message sent! I\'ll get back to you soon.';
                        formMessage.classList.remove('hidden');
                    }
                    contactForm.reset();
                } else {
                    // Error from server
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        throw new Error(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        throw new Error('Oops! There was a problem submitting your form');
                    }
                }
            } catch (error) {
                // Network or other error
                if (formMessage) {
                    formMessage.className = 'form-error p-3 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 mt-4 text-center';
                    formMessage.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${error.message || 'Something went wrong. Please try again.'}`;
                    formMessage.classList.remove('hidden');
                }
            } finally {
                // Restore button state
                submitButton.disabled = false;
                submitButton.innerHTML = originalBtnText;

                // Auto hide success message after 5 seconds
                if (formMessage && formMessage.classList.contains('form-success')) {
                    setTimeout(() => {
                        formMessage.classList.add('hidden');
                        // Clean up classes
                        formMessage.className = 'hidden';
                    }, 5000);
                }
            }
        });
    }
}
