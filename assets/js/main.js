// SGJ Institute Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeAnimations();
    initializeFormValidation();
    initializeSmoothScrolling();
    initializeBackToTop();
    
    // Load header and footer dynamically
    loadHeaderFooter();
});

// Navigation Functions
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('hidden');
            const isOpen = !mainNav.classList.contains('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav && !mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            mainNav.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// Animation Functions
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-up elements
    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });
}

// Form Validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showError(field, 'This field is required');
                } else {
                    clearError(field);
                }
            });
            
            // Email validation
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                if (field.value && !isValidEmail(field.value)) {
                    isValid = false;
                    showError(field, 'Please enter a valid email address');
                }
            });
            
            // Phone validation
            const phoneFields = form.querySelectorAll('input[type="tel"]');
            phoneFields.forEach(field => {
                if (field.value && !isValidPhone(field.value)) {
                    isValid = false;
                    showError(field, 'Please enter a valid 10-digit phone number');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                form.querySelector('.form-error')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    showError(this, 'This field is required');
                } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                    showError(this, 'Please enter a valid email address');
                } else if (this.type === 'tel' && this.value && !isValidPhone(this.value)) {
                    showError(this, 'Please enter a valid 10-digit phone number');
                } else {
                    clearError(this);
                }
            });
        });
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

function showError(field, message) {
    clearError(field);
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-600 text-sm mt-1';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    
    field.parentNode.appendChild(errorDiv);
    field.setAttribute('aria-describedby', errorDiv.id || 'error-' + Date.now());
}

function clearError(field) {
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');
    const errorMessages = field.parentNode.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.add('hidden');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Header/Footer Loading
function loadHeaderFooter() {
    // This function would typically load header/footer via AJAX
    // For now, we'll just ensure the placeholders exist
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (headerPlaceholder) {
        // Header loading would go here
        console.log('Header placeholder found');
    }
    
    if (footerPlaceholder) {
        // Footer loading would go here
        console.log('Footer placeholder found');
    }
}

// Dark Mode Toggle
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
    } else {
        html.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
    }
    
    // Update toggle button icon
    const toggleButton = document.getElementById('dark-mode-toggle');
    if (toggleButton) {
        const icon = toggleButton.querySelector('svg');
        if (icon) {
            icon.innerHTML = isDark ? 
                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>' :
                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
        }
    }
}

// Initialize Dark Mode
function initializeDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode === 'true' || (savedMode === null && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
    
    const toggleButton = document.getElementById('dark-mode-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleDarkMode);
    }
}

// Form Submission Handling
function handleFormSubmission(formId, endpoint) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : '';
        
        // Show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
        }
        
        try {
            const formData = new FormData(form);
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                showSuccessMessage('Form submitted successfully!');
                form.reset();
            } else {
                showErrorMessage(result.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showErrorMessage('Network error. Please try again.');
        } finally {
            // Restore button state
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    });
}

// Message Display Functions
function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDarkMode);
} else {
    initializeDarkMode();
}