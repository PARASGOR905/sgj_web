// SGJ Institute Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeAnimations();
    initializeFormValidation();
    initializeSmoothScrolling();
    initializeBackToTop();
    
    // Load header and footer dynamically
    loadHeaderFooter();
});

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
        if (form.dataset.customValidation === 'true') {
            return;
        }

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
    const errorId = 'error-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    errorDiv.className = 'error-message text-red-600 text-sm mt-1';
    errorDiv.id = errorId;
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    
    field.parentNode.appendChild(errorDiv);
    field.setAttribute('aria-describedby', errorId);
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
        // Header loading is handled by layout.js.
    }
    
    if (footerPlaceholder) {
        // Footer loading is handled by layout.js.
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

// Initialize dark mode only when layout.js has defined it.
if (typeof initializeDarkMode === 'function') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeDarkMode);
    } else {
        initializeDarkMode();
    }
}

