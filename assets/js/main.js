// TruthRise Main JavaScript File

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any functionality that needs to run on page load
    initializeApp();
});

function initializeApp() {
    // Check login state and update navigation
    checkLoginState();
    
    // Mobile navigation toggle
    initMobileNav();
    
    // Smooth scrolling for anchor links
    initSmoothScroll();
    
    // Form validation
    initFormValidation();
    
    // Dynamic content loading
    initDynamicContent();
    
    // Login/Signup modals
    initAuthModals();
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
    
    // Enhanced sidebar toggle for dashboard pages
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const body = document.body;
    
    function toggleSidebar() {
        if (!sidebar) return;
        
        sidebar.classList.toggle('sidebar-open');
        if (overlay) {
            overlay.classList.toggle('active');
        }
        
        // Prevent body scroll when sidebar is open on mobile
        if (sidebar.classList.contains('sidebar-open')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebar();
        });
    }
    
    // Close sidebar when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            if (sidebar && sidebar.classList.contains('sidebar-open')) {
                toggleSidebar();
            }
        });
    }
    
    // Close sidebar on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('sidebar-open')) {
            toggleSidebar();
        }
    });
    
    // Handle window resize - close sidebar on desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && sidebar && sidebar.classList.contains('sidebar-open')) {
            sidebar.classList.remove('sidebar-open');
            if (overlay) overlay.classList.remove('active');
            body.style.overflow = '';
        }
    });
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

// Check Login State
function checkLoginState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const menu = document.getElementById('menu');
    
    if (isLoggedIn && menu) {
        const userEmail = localStorage.getItem('userEmail');
        const userName = localStorage.getItem('userName');
        const displayName = userName || userEmail || 'User';
        
        // Replace login/signup buttons with user menu
        menu.innerHTML = `
            <a href="main-app/dashboard.html" class="text-[var(--light-text)] hover:text-[var(--brand-cyan)]">Dashboard</a>
            <div class="relative group">
                <button class="text-[var(--light-text)] hover:text-[var(--brand-cyan)] flex items-center">
                    ${displayName} 
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div class="absolute right-0 mt-2 w-48 bg-[var(--dark-bg)] border border-[var(--brand-cyan)] rounded-lg shadow-lg hidden group-hover:block z-50">
                    <a href="main-app/profile.html" class="block px-4 py-2 text-[var(--light-text)] hover:bg-[var(--brand-cyan)] hover:text-[var(--accent-text)]">Profile</a>
                    <a href="#" id="logout-index-btn" class="block px-4 py-2 text-[var(--light-text)] hover:bg-[var(--brand-cyan)] hover:text-[var(--accent-text)]">Logout</a>
                </div>
            </div>
        `;
        
        // Add logout functionality for index page
        const logoutIndexBtn = document.getElementById('logout-index-btn');
        if (logoutIndexBtn) {
            logoutIndexBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Clear login state
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userName');
                localStorage.removeItem('loginTime');
                
                // Reload page to reset navigation
                window.location.reload();
            });
        }
    }
}

// Authentication Modals
function initAuthModals() {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeLoginModal = document.getElementById('close-login-modal');
    const closeSignupModal = document.getElementById('close-signup-modal');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // Open login modal
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }

    // Open signup modal
    if (signupBtn && signupModal) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            signupModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close login modal
    if (closeLoginModal && loginModal) {
        closeLoginModal.addEventListener('click', function() {
            loginModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }

    // Close signup modal
    if (closeSignupModal && signupModal) {
        closeSignupModal.addEventListener('click', function() {
            signupModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }

    // Switch to signup from login
    if (showSignup && loginModal && signupModal) {
        showSignup.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.add('hidden');
            signupModal.classList.remove('hidden');
        });
    }

    // Switch to login from signup
    if (showLogin && signupModal && loginModal) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            signupModal.classList.add('hidden');
            loginModal.classList.remove('hidden');
        });
    }

    // Close modals when clicking outside
    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }

    if (signupModal) {
        signupModal.addEventListener('click', function(e) {
            if (e.target === signupModal) {
                signupModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (email && password) {
                // Simulate login process
                const successMessage = document.getElementById('login-success');
                successMessage.classList.remove('hidden');
                
                // Hide form elements
                loginForm.style.display = 'none';
                
                // Simulate login process and redirect to dashboard
                setTimeout(() => {
                    // Store login state in localStorage
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('loginTime', Date.now().toString());
                    
                    // Redirect to dashboard
                    window.location.href = 'main-app/dashboard.html';
                }, 2000);
            }
        });
    }

    // Handle signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            const terms = document.getElementById('signup-terms').checked;
            
            // Basic validation
            if (password !== confirmPassword) {
                showNotification('Passwords do not match!', 'error');
                return;
            }
            
            if (!terms) {
                showNotification('Please accept the Terms of Service', 'error');
                return;
            }
            
            if (name && email && password && confirmPassword && terms) {
                // Simulate signup process
                const successMessage = document.getElementById('signup-success');
                successMessage.classList.remove('hidden');
                
                // Hide form elements
                signupForm.style.display = 'none';
                
                // Simulate signup process and redirect to dashboard
                setTimeout(() => {
                    // Store login state in localStorage
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userName', name);
                    localStorage.setItem('loginTime', Date.now().toString());
                    
                    // Redirect to dashboard
                    window.location.href = 'main-app/dashboard.html';
                }, 3000);
            }
        });
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

