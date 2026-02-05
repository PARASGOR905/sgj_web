// SGJ Institute Layout JavaScript File
// Handles header/footer loading and layout functionality

document.addEventListener('DOMContentLoaded', function () {
    loadHeader();
    loadFooter();
    initializeLayoutComponents();
});

// Load Header
function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;
    // Prevent double-injection if called multiple times
    if (headerPlaceholder.dataset.loaded === 'true') return;

    // Determine path prefix based on current location
    const pathPrefix = window.location.pathname.includes('/courses/') ? '../' : './';
    
    // Create header element
    const header = document.createElement('header');
    header.className = 'sticky top-0 z-50 shadow-md simple-theme';
    header.style.backgroundColor = 'var(--primary)';
    header.style.borderBottom = '1px solid var(--border-light)';
    header.style.color = 'white';
    
    header.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            <!-- Logo -->
            <div class="flex items-center gap-4">
                <!-- SGJ Institute Logo -->
                <div class="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg shadow-sm flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 sm:w-8 sm:h-8 text-[#0B3C5D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <!-- Academic Cap -->
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    <!-- Book -->
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                </div>
                <div class="leading-tight">
                  <span class="block font-bold text-white text-base sm:text-lg whitespace-nowrap">SGJ Institute</span>
                  <span class="hidden sm:block text-xs sm:text-sm text-[#FFC107]">Management &amp; IT</span>
                </div>
            </div>

            <!-- Mobile menu button -->
            <button id="mobile-menu-btn" class="md:hidden text-white focus:outline-none" aria-label="Toggle menu" aria-expanded="false" style="color: white !important;">
                <svg class="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="color: white !important; stroke: white !important;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>

            <!-- Nav -->
            <nav id="main-nav" class="md:flex items-center gap-6 text-white font-medium hidden flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-[var(--primary)] md:bg-transparent px-4 pb-4 md:px-0 md:pb-0 space-y-2 md:space-y-0" role="navigation" aria-label="Main navigation" style="color: white !important; fill: white !important;">
                <a href="${pathPrefix}index.html" class="nav-link text-[--accent] hover:text-white transition duration-300 px-3 py-2 rounded-lg hover:bg-[--accent]/30 w-full md:w-auto" style="color: var(--accent) !important;">Home</a>
                <a href="${pathPrefix}about.html" class="nav-link text-[--accent] hover:text-white transition duration-300 px-3 py-2 rounded-lg hover:bg-[--accent]/30 w-full md:w-auto" style="color: var(--accent) !important;">About</a>
                <a href="${pathPrefix}gallery.html" class="nav-link text-[--accent] hover:text-white transition duration-300 px-3 py-2 rounded-lg hover:bg-[--accent]/30 w-full md:w-auto" style="color: var(--accent) !important;">Gallery</a>
                <a href="${pathPrefix}downloads.html" class="nav-link text-[--accent] hover:text-white transition duration-300 px-3 py-2 rounded-lg hover:bg-[--accent]/30 w-full md:w-auto" style="color: var(--accent) !important;">Downloads</a>
                <!-- Mobile Apply Now inside menu -->
                <a href="${pathPrefix}contact.html"
                   class="md:hidden mt-2 w-full text-center font-semibold rounded-lg"
                   style="background: linear-gradient(135deg, var(--accent) 0%, #E6C200 100%) !important; color: var(--primary) !important; padding: 0.5rem 1rem;">
                    Apply Now
                </a>
            </nav>

            <!-- Desktop Apply Now button -->
            <div class="hidden md:flex items-center ml-4 flex-shrink-0">
                <a href="${pathPrefix}contact.html"
                   class="btn-header font-semibold transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap"
                   style="background: linear-gradient(135deg, var(--accent) 0%, #E6C200 100%) !important; color: var(--primary) !important; padding: 0.625rem 1.5rem; border-radius: 0.5rem;">
                    Apply Now
                </a>
            </div>
        </div>
    `;
    
    headerPlaceholder.appendChild(header);
    headerPlaceholder.dataset.loaded = 'true';
    
    // Initialize header functionality
    initializeHeaderFunctionality();
}

// Load Footer
function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;
    // Prevent double-injection if called multiple times
    if (footerPlaceholder.dataset.loaded === 'true') return;

    // Determine path prefix based on current location
    const pathPrefix = window.location.pathname.includes('/courses/') ? '../' : './';
    
    // Create footer element
    const footer = document.createElement('footer');
    footer.className = 'text-dark simple-theme';
    footer.style.backgroundColor = 'var(--bg-dark)';
    footer.style.borderTop = '1px solid var(--border-light)';
    
    footer.innerHTML = `
        <div class="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
            <!-- About -->
            <div>
                <h3 class="text-white font-semibold mb-3">
                    SGJ Institute of Management & IT
                </h3>
                <p class="text-sm leading-relaxed" style="color: #E5E7EB !important; opacity: 1 !important;">
                    A premier educational institution in Kutch committed to quality
                    education, innovation, and holistic student development.
                </p>
            </div>

            <!-- Links -->
            <div>
                <h3 class="text-white font-semibold mb-3" style="color: white !important; font-weight: 600 !important;">Quick Links</h3>
                <ul class="space-y-2 text-sm">
                    <li><a href="${pathPrefix}index.html" class="hover:text-[--accent]" style="color: #D1D5DB !important;">Home</a></li>
                    <li><a href="${pathPrefix}about.html" class="hover:text-[--accent]" style="color: #D1D5DB !important;">About</a></li>
                    <li><a href="${pathPrefix}gallery.html" class="hover:text-[--accent]" style="color: #D1D5DB !important;">Gallery</a></li>
                    <li><a href="${pathPrefix}downloads.html" class="hover:text-[--accent]" style="color: #D1D5DB !important;">Downloads</a></li>
                    <li><a href="${pathPrefix}contact.html" class="hover:text-[--accent]" style="color: #D1D5DB !important;">Contact</a></li>
                </ul>
            </div>

            <!-- Contact -->
            <div>
                <h3 class="text-white font-semibold mb-3">Contact</h3>
                <p class="text-sm">
                    Shree Swaminarayan Gurukul<br>
                    Mandvi, Kutch, Gujarat<br><br>
                    📞 <a href="tel:+919099987846" class="hover:text-[--accent]">+91 9099987846</a><br>
                    📧 <a href="mailto:info@sgjcollege.in" class="hover:text-[--accent]">info@sgjcollege.in</a>
                </p>
            </div>
        </div>

        <div class="border-t border-[--border-light] text-center py-4" style="color: #D1D5DB !important; font-size: 14px !important;">
            © <span id="year"></span> SGJ Institute of Management & IT. All rights reserved.
            <script>
                document.getElementById("year").textContent = new Date().getFullYear();
            </script>
        </div>
        
        <!-- Back to Top Button -->
        <button id="backToTop" class="back-to-top hidden" aria-label="Back to top" title="Back to top">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    `;
    
    footerPlaceholder.appendChild(footer);
    footerPlaceholder.dataset.loaded = 'true';
    
    // Initialize footer functionality
    initializeFooterFunctionality();
}

// Initialize Header Functionality
function initializeHeaderFunctionality() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    // Mobile menu toggle
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = mainNav.classList.contains('hidden');
            mainNav.classList.toggle('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            
            // Change hamburger icon to close icon
            const svg = mobileMenuBtn.querySelector('svg');
            if (svg) {
                svg.innerHTML = isExpanded ? 
                    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />' :
                    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav && !mainNav.contains(event.target) && 
            mobileMenuBtn && !mobileMenuBtn.contains(event.target)) {
            mainNav.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            
            // Reset hamburger icon
            const svg = mobileMenuBtn.querySelector('svg');
            if (svg) {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
            }
        }
    });
    
    // Dark mode functionality removed - icon eliminated for cleaner academic experience
    
    // Active link highlighting
    highlightActiveLink();
}

// Initialize Footer Functionality
function initializeFooterFunctionality() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide back to top button
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('hidden');
                backToTopButton.classList.add('block');
            } else {
                backToTopButton.classList.add('hidden');
                backToTopButton.classList.remove('block');
            }
        });
        
        // Scroll to top functionality
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Highlight active navigation link
function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#main-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('text-white', 'bg-[--accent]/30');
            link.classList.remove('text-[--accent]');
        }
    });
}

// Dark Mode Functions
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
    
    updateDarkModeIcon();
}

function updateDarkModeIcon() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;
    
    const isDark = document.documentElement.classList.contains('dark');
    const svg = darkModeToggle.querySelector('svg');
    
    if (svg) {
        svg.innerHTML = isDark ? 
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>' :
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
    }
}

function initializeDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode === 'true' || (savedMode === null && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
    
    updateDarkModeIcon();
}

// Initialize all layout components
function initializeLayoutComponents() {
    initializeDarkMode();
    
    // Add scroll padding for fixed header
    document.documentElement.style.scrollPaddingTop = '80px';
    
    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        const mainNav = document.getElementById('main-nav');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (window.innerWidth >= 768 && mainNav) {
            mainNav.classList.remove('hidden');
            if (mobileMenuBtn) {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const svg = mobileMenuBtn.querySelector('svg');
                if (svg) {
                    svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
                }
            }
        }
    });
}

// Export functions for global use
window.loadHeader = loadHeader;
window.loadFooter = loadFooter;
window.toggleDarkMode = toggleDarkMode;