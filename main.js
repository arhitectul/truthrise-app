// TruthRise Main JavaScript File

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any functionality that needs to run on page load
    initializeApp();
});

function initializeApp() {
    // Mobile navigation toggle
    initMobileNav();
    
    // Smooth scrolling for anchor links
    initSmoothScroll();
    
    // Form validation
    initFormValidation();
    
    // Dynamic content loading
    initDynamicContent();
}

// Mobile Navigation Toggle
function initMobileNav() {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('hidden');
        });
    }
    
    // Sidebar toggle for dashboard pages
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('sidebar-open');
        });
    }
}

// Smooth scrolling for internal links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error text-error text-sm mt-1';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    field.classList.add('border-error');
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.error');
    if (existingError) {
        existingError.remove();
    }
    field.classList.remove('border-error');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Dynamic Content Loading
function initDynamicContent() {
    // Platform Features Toggle (Victim/Contributor)
    const victimBtn = document.getElementById('victim-btn');
    const contributorBtn = document.getElementById('contributor-btn');
    const victimContent = document.getElementById('victim-content');
    const contributorContent = document.getElementById('contributor-content');
    
    if (victimBtn && contributorBtn && victimContent && contributorContent) {
        victimBtn.addEventListener('click', function() {
            showVictimContent();
        });
        
        contributorBtn.addEventListener('click', function() {
            showContributorContent();
        });
    }
    
    function showVictimContent() {
        victimContent.classList.remove('hidden');
        contributorContent.classList.add('hidden');
        
        // Update button states
        victimBtn.className = 'cta-primary text-[var(--accent-text)] pulse-glow';
        contributorBtn.className = 'cta-outline text-[var(--brand-cyan)]';
    }
    
    function showContributorContent() {
        contributorContent.classList.remove('hidden');
        victimContent.classList.add('hidden');
        
        // Update button states
        contributorBtn.className = 'cta-primary text-[var(--accent-text)] pulse-glow';
        victimBtn.className = 'cta-outline text-[var(--brand-cyan)]';
    }
}

// Contact Form Handler
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('contact-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            setTimeout(() => {
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                }
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    if (successMessage) {
                        successMessage.classList.add('hidden');
                    }
                }, 5000);
            }, 1000);
        });
    }
}

// Initialize contact form when DOM is ready
document.addEventListener('DOMContentLoaded', initContactForm);

// Utility Functions
function showLoading(element) {
    const loading = document.createElement('div');
    loading.className = 'loading';
    element.appendChild(loading);
}

function hideLoading(element) {
    const loading = element.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type} fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50`;
    notification.style.backgroundColor = type === 'success' ? 'var(--success-green)' : 
                                       type === 'error' ? 'var(--error-red)' : 
                                       'var(--brand-cyan)';
    notification.style.color = 'var(--light-text)';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Click to remove
    notification.addEventListener('click', () => {
        notification.remove();
    });
}

// Export functions for use in other scripts
window.TruthRise = {
    showNotification,
    showLoading,
    hideLoading,
    validateForm
};
