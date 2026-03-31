// SGJ Institute Layout JavaScript File
// Handles header/footer loading and layout functionality

async function initLayout() {
    await loadHeader();
    await loadFooter();
    initializeLayoutComponents();
    highlightActiveLink();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayout);
} else {
    initLayout();
}

function getPathPrefix() {
    return window.location.pathname.includes('/courses/') ? '../' : './';
}

function getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
}

// Load Header
async function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;
    if (headerPlaceholder.dataset.loaded === 'true') return;

    const pathPrefix = getPathPrefix();
    try {
        const response = await fetch(pathPrefix + 'includes/header.html');
        if (!response.ok) throw new Error('Failed to fetch header');
        const html = await response.text();
        const processedHtml = html.replace(/\{\{pathPrefix\}\}/g, pathPrefix);
        headerPlaceholder.innerHTML = processedHtml;
        headerPlaceholder.dataset.loaded = 'true';
        initializeHeaderFunctionality();
    } catch (error) {
        console.error('Error loading header:', error);
        if (window.location.protocol === 'file:') {
            headerPlaceholder.innerHTML = '<div style="background: #fee2e2; border: 1px solid #ef4444; color: #b91c1c; padding: 1rem; text-align: center; border-radius: 0.5rem; margin: 1rem; z-index: 9999; position: relative;"><strong>Header won\'t load across file://</strong><br>For the header and footer to load, please view this website through localhost (XAMPP). Do not double-click the HTML files.</div>';
        }
    }
}

// Load Footer
async function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;
    if (footerPlaceholder.dataset.loaded === 'true') return;

    const pathPrefix = getPathPrefix();
    try {
        const response = await fetch(pathPrefix + 'includes/footer.html');
        if (!response.ok) throw new Error('Failed to fetch footer');
        const html = await response.text();
        const processedHtml = html.replace(/\{\{pathPrefix\}\}/g, pathPrefix);
        footerPlaceholder.innerHTML = processedHtml;
        footerPlaceholder.dataset.loaded = 'true';
        initializeFooterFunctionality();
    } catch (error) {
        console.error('Error loading footer:', error);
        if (window.location.protocol === 'file:') {
            footerPlaceholder.innerHTML = '<div style="background: #fee2e2; border: 1px solid #ef4444; color: #b91c1c; padding: 1rem; text-align: center; border-radius: 0.5rem; margin: 1rem; z-index: 9999; position: relative;"><strong>Footer won\'t load across file://</strong><br>For the header and footer to load, please view this website through localhost (XAMPP). Do not double-click the HTML files.</div>';
        }
    }
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

