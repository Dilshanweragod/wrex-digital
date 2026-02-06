document.addEventListener('DOMContentLoaded', () => {
    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
            const icon = item.querySelector('i');
            if (item.classList.contains('active')) {
                icon.classList.remove('ri-add-line');
                icon.classList.add('ri-subtract-line');
            } else {
                icon.classList.remove('ri-subtract-line');
                icon.classList.add('ri-add-line');
            }
        });
    });

    // Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (navList.style.display === 'flex') {
                navList.style.display = 'none';
            } else {
                navList.style.display = 'flex';
                navList.style.flexDirection = 'column';
                navList.style.position = 'absolute';
                navList.style.top = '70px';
                navList.style.right = '20px';
                navList.style.background = '#111';
                navList.style.padding = '2rem';
                navList.style.borderRadius = '12px';
                navList.style.border = '1px solid rgba(255,255,255,0.1)';
            }
        });
    }

    // Modal Toggle
    const modal = document.getElementById('contact-modal');
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtn = document.querySelector('.close-modal');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('open');
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
        });
    }

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
        }
    });

    // Modal Form Submission (Web3Forms)
    const modalForm = document.getElementById('modal-contact-form');
    const modalSuccess = document.getElementById('modal-form-success');

    if (modalForm) {
        modalForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(modalForm);
            const submitBtn = modalForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    // Show success message
                    modalForm.classList.add('hidden');
                    modalSuccess.classList.add('visible');

                    setTimeout(() => {
                        modal.classList.remove('open');
                        setTimeout(() => {
                            modalForm.classList.remove('hidden');
                            modalSuccess.classList.remove('visible');
                            modalForm.reset();
                        }, 500);
                    }, 2000);
                } else {
                    alert('Error: ' + (result.message || 'Something went wrong'));
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Sorry, there was an error sending your message. Please try again.');
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Scroll Animations (Enhanced)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add specific animation classes based on element type if needed
                if (entry.target.classList.contains('fade-in-up')) {
                    entry.target.style.animationPlayState = 'running';
                }
                // Add specific animation classes based on element type
                if (entry.target.classList.contains('rating-fill')) {
                    entry.target.style.width = '98%';
                }
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .fade-in-up, .scale-in, .stat-card-dark, .row-anim, .step-card, .tool-bar-item, .rating-fill, .process-step-item, .tool-pill, .review-item, .service-card').forEach(el => {
        observer.observe(el);
    });
});
