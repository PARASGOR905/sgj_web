// SGJ Institute Layout JavaScript File
// Handles header/footer loading and layout functionality

document.addEventListener('DOMContentLoaded', function () {
    loadHeader();
    loadFooter();
    initializeLayoutComponents();
    highlightActiveLink();
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
        <div class="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-8">
            <div>
                <h3 class="text-white font-semibold mb-3">
                    SGJ Institute of Management & IT
                </h3>
                <p class="text-sm leading-relaxed" style="color: #E5E7EB !important; opacity: 1 !important;">
                    A premier educational institution in Kutch committed to quality
                    education, innovation, and holistic student development.
                </p>
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
        </div>

        <div class="border-t border-[var(--border-light)] text-center py-4" style="color: #D1D5DB !important; font-size: 14px !important;">
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
