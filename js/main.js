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
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('mobile-active');
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
    const mainForm = document.getElementById('main-contact-form');
    const mainSuccess = document.getElementById('form-success');

    const handleFormSubmit = async (form, successMsg, isModal = false) => {
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    form.classList.add('hidden');
                    successMsg.classList.add('visible');

                    if (isModal) {
                        setTimeout(() => {
                            modal.classList.remove('open');
                            setTimeout(() => {
                                form.classList.remove('hidden');
                                successMsg.classList.remove('visible');
                                form.reset();
                            }, 500);
                        }, 2000);
                    } else {
                        setTimeout(() => {
                            form.classList.remove('hidden');
                            successMsg.classList.remove('visible');
                            form.reset();
                        }, 5000);
                    }
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
    };

    handleFormSubmit(modalForm, modalSuccess, true);
    handleFormSubmit(mainForm, mainSuccess, false);

    // Theme Switcher Logic
    const panelToggle = document.getElementById('panel-toggle');
    const modeToggle = document.getElementById('mode-toggle');
    const themePanel = document.getElementById('theme-panel');
    const colorDots = document.querySelectorAll('.color-dot');
    const htmlElement = document.documentElement;

    // Load saved preferences
    const savedTheme = localStorage.getItem('wrex-theme') || 'orange';

    applyTheme(savedTheme);

    if (panelToggle) {
        panelToggle.addEventListener('click', () => {
            themePanel.classList.toggle('open');
        });
    }



    colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const theme = dot.getAttribute('data-theme');
            applyTheme(theme);

            // Close panel on selection
            themePanel.classList.remove('open');
        });
    });

    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('wrex-theme', theme);

        // Update active dot
        colorDots.forEach(dot => {
            if (dot.getAttribute('data-theme') === theme) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }



    // Close theme panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!themePanel.contains(e.target) && !panelToggle.contains(e.target)) {
            themePanel.classList.remove('open');
        }
    });

    // Scroll Animations (Enhanced)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .fade-in-up, .scale-in, .pillar-card, .timeline-step, .service-card, .project-card, .feature-card-sm, .matrix-item, .market-core, .mission-path-container').forEach(el => {
        observer.observe(el);
    });
});
