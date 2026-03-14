// SGJ Institute Layout JavaScript File
// Handles header/footer loading and layout functionality

document.addEventListener('DOMContentLoaded', function () {
    loadHeader();
    loadFooter();
    initializeLayoutComponents();
    highlightActiveLink();
    initializeZoomControls();
});

function getPathPrefix() {
    return window.location.pathname.includes('/courses/') ? '../' : './';
}

function getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
}

// Load Header
function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;
    if (headerPlaceholder.dataset.loaded === 'true') return;

    const pathPrefix = getPathPrefix();
    const header = document.createElement('header');
    header.className = 'sticky top-0 shadow-md simple-theme';
    header.style.backgroundColor = 'var(--primary)';
    header.style.borderBottom = '1px solid var(--border-light)';
    header.style.color = 'white';
    header.style.zIndex = '11000';

    header.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-3 min-w-0 md:flex-row md:justify-between md:gap-8">
            <div class="flex min-w-0 items-center gap-3 sm:gap-4 md:justify-start md:flex-shrink-0">
                <div class="flex items-center justify-center w-auto h-10 sm:h-12 flex-shrink-0">
                  <img src="${pathPrefix}assets/images/SGJ_LOGO.png" alt="SGJ Institute Logo" class="h-full w-auto object-contain">
                </div>
                <div class="min-w-0 leading-tight">
                  <span class="block font-extrabold text-white text-base sm:text-lg tracking-wide truncate">SGJ Institute</span>
                  <span class="block text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-yellow-400 truncate mt-0.5">Management &amp; IT</span>
                </div>
            </div>

            <button id="mobile-menu-btn" class="md:hidden flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white shadow-sm transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--primary)]" aria-label="Toggle menu" aria-expanded="false">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>

            <nav id="main-nav" class="flex flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-[var(--primary)] md:bg-transparent shadow-lg md:shadow-none" role="navigation" aria-label="Main navigation">
                <a href="${pathPrefix}index.html" class="nav-link text-white hover:text-[var(--accent)] transition-colors duration-300 px-5 py-2.5 rounded-lg hover:bg-white/10 font-semibold text-sm md:text-base block">Home</a>
                <a href="${pathPrefix}about.html" class="nav-link text-white hover:text-[var(--accent)] transition-colors duration-300 px-5 py-2.5 rounded-lg hover:bg-white/10 font-semibold text-sm md:text-base block">About</a>
                <a href="${pathPrefix}gallery.html" class="nav-link text-white hover:text-[var(--accent)] transition-colors duration-300 px-5 py-2.5 rounded-lg hover:bg-white/10 font-semibold text-sm md:text-base block">Gallery</a>
                <a href="${pathPrefix}downloads.html" class="nav-link text-white hover:text-[var(--accent)] transition-colors duration-300 px-5 py-2.5 rounded-lg hover:bg-white/10 font-semibold text-sm md:text-base block">Resources</a>
                <a href="${pathPrefix}contact.html" class="nav-link text-white hover:text-[var(--accent)] transition-colors duration-300 px-5 py-2.5 rounded-lg hover:bg-white/10 font-semibold text-sm md:text-base block">Contact</a>
            </nav>
        </div>
    `;

    headerPlaceholder.appendChild(header);
    headerPlaceholder.dataset.loaded = 'true';

    initializeHeaderFunctionality();
}

// Load Footer
function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;
    if (footerPlaceholder.dataset.loaded === 'true') return;

    const pathPrefix = getPathPrefix();

    const footer = document.createElement('footer');
    footer.className = 'text-white simple-theme';
    footer.style.backgroundColor = 'var(--bg-dark)';
    footer.style.borderTop = '1px solid var(--border-light)';

    footer.innerHTML = `
        <div class="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-4 gap-8">
            <div class="md:col-span-1">
                <h3 class="text-white font-semibold mb-3">
                    SGJ Institute of Management & IT
                </h3>
                <p class="text-sm leading-relaxed mb-4" style="color: #E5E7EB !important; opacity: 1 !important;">
                    A premier educational institution in Kutch committed to quality
                    education, innovation, and holistic student development.
                </p>
                <div class="flex gap-4">
                    <a href="#" target="_blank" rel="noopener noreferrer" class="text-[#E5E7EB] hover:text-[#D97706] transition-colors" aria-label="Follow us on Facebook">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                        </svg>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" class="text-[#E5E7EB] hover:text-[#D97706] transition-colors" aria-label="Follow us on Instagram">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
                        </svg>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" class="text-[#E5E7EB] hover:text-[#D97706] transition-colors" aria-label="Subscribe to our YouTube channel">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418zM10.02 15.5l6.388-3.484-6.388-3.484V15.5z" clip-rule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>

            <div>
                <h3 class="text-white font-semibold mb-3" style="color: white !important; font-weight: 600 !important;">Quick Links</h3>
                <ul class="space-y-2 text-sm">
                    <li><a href="${pathPrefix}index.html" class="hover:text-[var(--accent)]" style="color: #E5E7EB !important;">Home</a></li>
                    <li><a href="${pathPrefix}about.html" class="hover:text-[var(--accent)]" style="color: #E5E7EB !important;">About</a></li>
                    <li><a href="${pathPrefix}gallery.html" class="hover:text-[var(--accent)]" style="color: #E5E7EB !important;">Gallery</a></li>
                    <li><a href="${pathPrefix}downloads.html" class="hover:text-[var(--accent)]" style="color: #E5E7EB !important;">Resources</a></li>
                    <li><a href="${pathPrefix}contact.html" class="hover:text-[var(--accent)]" style="color: #E5E7EB !important;">Contact</a></li>
                </ul>
            </div>

            <div>
                <h3 class="text-white font-semibold mb-3" style="color: white !important;">Contact</h3>
                <p class="text-sm" style="color: #E5E7EB !important;">
                    Shree Swaminarayan Gurukul<br>
                    Mandvi, Kutch, Gujarat<br><br>
                    Phone: <a href="tel:+919099987846" class="hover:text-[var(--accent)]" style="color: #F8FAFC !important;">+91 9099987846</a><br>
                    Email: <a href="mailto:info@sgjcollege.in" class="hover:text-[var(--accent)]" style="color: #F8FAFC !important;">info@sgjcollege.in</a>
                </p>
            </div>
            
            <div>
                <h3 class="text-white font-semibold mb-3" style="color: white !important;">Find Us</h3>
                <div class="h-32 w-full rounded-lg overflow-hidden border border-[var(--border-light)] relative bg-gray-200">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1544.116630718503!2d69.21045999999999!3d23.012521199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3950fb0368aebde3%3A0xeab4ab194b3da58a!2sShri%20Swaminarayan%20Gurukul-%20Mandvi(kutch)!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                      width="100%" 
                      height="100%" 
                      style="border:0;" 
                      allowfullscreen="" 
                      loading="lazy" 
                      referrerpolicy="no-referrer-when-downgrade"
                      aria-label="Map location of SGJ Institute">
                    </iframe>
                </div>
            </div>
        </div>

        <div class="border-t border-[var(--border-light)] text-center flex flex-col items-center justify-center py-4" style="color: #D1D5DB !important; font-size: 14px !important;">
            &copy; <span id="year"></span> SGJ Institute of Management & IT. All rights reserved.
        </div>

        <button id="backToTop" class="back-to-top hidden" aria-label="Back to top" title="Back to top">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    `;

    footerPlaceholder.appendChild(footer);
    footerPlaceholder.dataset.loaded = 'true';

    initializeFooterFunctionality();
}

function initializeHeaderFunctionality() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenuBtn && mainNav) {
        mainNav.classList.remove('active');
        mainNav.setAttribute('aria-hidden', 'true');

        mobileMenuBtn.addEventListener('click', function () {
            const isExpanded = mainNav.classList.contains('active');
            if (isExpanded) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        if (!document.querySelector('.menu-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'menu-overlay';
            document.body.appendChild(overlay);

            overlay.addEventListener('click', function () {
                closeMobileMenu();
            });
        }

        mainNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth < 768) {
                    closeMobileMenu();
                }
            });
        });
    }

    document.addEventListener('click', function (event) {
        if (
            mainNav &&
            mobileMenuBtn &&
            !mainNav.contains(event.target) &&
            !mobileMenuBtn.contains(event.target) &&
            mainNav.classList.contains('active')
        ) {
            closeMobileMenu();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && mainNav && mainNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function openMobileMenu() {
    const mainNav = document.getElementById('main-nav');
    const overlay = document.querySelector('.menu-overlay');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');

    if (mainNav && overlay && mobileMenuBtn) {
        mainNav.classList.add('active');
        mainNav.setAttribute('aria-hidden', 'false');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        mobileMenuBtn.setAttribute('aria-expanded', 'true');

        const svg = mobileMenuBtn.querySelector('svg');
        if (svg) {
            svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
        }
    }
}

function closeMobileMenu() {
    const mainNav = document.getElementById('main-nav');
    const overlay = document.querySelector('.menu-overlay');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');

    if (mainNav && overlay && mobileMenuBtn) {
        mainNav.classList.remove('active');
        mainNav.setAttribute('aria-hidden', 'true');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');

        const svg = mobileMenuBtn.querySelector('svg');
        if (svg) {
            svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        }
    }
}

function initializeFooterFunctionality() {
    const backToTopButton = document.getElementById('backToTop');
    const yearElement = document.getElementById('year');

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('hidden');
                backToTopButton.classList.add('block');
            } else {
                backToTopButton.classList.add('hidden');
                backToTopButton.classList.remove('block');
            }
        });

        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
    }
}

function highlightActiveLink() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('#main-nav .nav-link');

    navLinks.forEach(link => {
        const rawHref = (link.getAttribute('href') || '').split('#')[0];
        const linkPage = rawHref.split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('text-white', 'bg-[var(--accent)]/30');
            link.classList.remove('text-[var(--accent)]');
        }
    });
}

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
        svg.innerHTML = isDark
            ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>'
            : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
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

function initializeLayoutComponents() {
    initializeDarkMode();
    document.documentElement.style.scrollPaddingTop = '80px';

    window.addEventListener('resize', function () {
        const mainNav = document.getElementById('main-nav');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const overlay = document.querySelector('.menu-overlay');

        if (window.innerWidth >= 768 && mainNav) {
            mainNav.classList.remove('active');
            mainNav.setAttribute('aria-hidden', 'false');
            if (overlay) {
                overlay.classList.remove('active');
            }
            document.body.style.overflow = '';
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

window.loadHeader = loadHeader;
window.loadFooter = loadFooter;
window.toggleDarkMode = toggleDarkMode;

function initializeZoomControls() {
    const minZoom = 0.5;
    const maxZoom = 2.0;
    const zoomStep = 0.1;

    // Load saved zoom or default to 1
    let currentZoom = parseFloat(localStorage.getItem('siteZoom')) || 1.0;
    
    // Apply immediately
    applyZoom(currentZoom);

    // Create floating zoom controls
    const zoomControls = document.createElement('div');
    zoomControls.className = 'fixed left-4 bottom-4 z-50 flex flex-col gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-gray-200/50 transition-all duration-300 hover:shadow-xl hover:bg-white';
    
    // In mobile, we might want it slightly higher if it conflicts with other buttons
    if (window.innerWidth < 768) {
        zoomControls.style.bottom = '80px';
    }

    zoomControls.innerHTML = `
        <button id="zoom-in" class="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors" aria-label="Zoom In" title="Zoom In (Current: ${Math.round(currentZoom * 100)}%)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        </button>
        <div class="h-px bg-gray-200 mx-2"></div>
        <button id="zoom-out" class="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors" aria-label="Zoom Out" title="Zoom Out">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
        </button>
        <div class="h-px bg-gray-200 mx-2"></div>
        <button id="zoom-reset" class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors text-xs font-bold" aria-label="Reset Zoom" title="Reset Zoom">
            100%
        </button>
    `;

    document.body.appendChild(zoomControls);

    // Event Listeners for buttons
    document.getElementById('zoom-in').addEventListener('click', () => {
        if (currentZoom < maxZoom) {
            currentZoom = Math.min(maxZoom, currentZoom + zoomStep);
            updateZoom(currentZoom);
        }
    });

    document.getElementById('zoom-out').addEventListener('click', () => {
        if (currentZoom > minZoom) {
            currentZoom = Math.max(minZoom, currentZoom - zoomStep);
            updateZoom(currentZoom);
        }
    });

    document.getElementById('zoom-reset').addEventListener('click', () => {
        currentZoom = 1.0;
        updateZoom(currentZoom);
    });

    // Update zoom and save to localStorage
    function updateZoom(zoomLevel) {
        // Fix floating point math issues (e.g. 1.09999999999)
        zoomLevel = Math.round(zoomLevel * 10) / 10;
        currentZoom = zoomLevel;
        localStorage.setItem('siteZoom', currentZoom);
        applyZoom(currentZoom);
        
        // Update Title on zoom-in button to show current percentage
        document.getElementById('zoom-in').title = `Zoom In (Current: ${Math.round(currentZoom * 100)}%)`;
    }

    // Apply the CSS variable
    function applyZoom(zoomLevel) {
        document.documentElement.style.setProperty('--site-zoom', zoomLevel);
    }

    // Listen for storage changes from OTHER tabs to stay in sync
    window.addEventListener('storage', function(e) {
        if (e.key === 'siteZoom') {
            const newZoom = parseFloat(e.newValue);
            if (!isNaN(newZoom)) {
                currentZoom = newZoom;
                applyZoom(currentZoom);
                document.getElementById('zoom-in').title = `Zoom In (Current: ${Math.round(currentZoom * 100)}%)`;
            }
        }
    });
}

