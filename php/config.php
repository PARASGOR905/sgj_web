<?php
// Configuration file for SGJ Institute
// IMPORTANT: Store machine-specific credentials in php/config.local.php or environment variables.

$localConfig = __DIR__ . '/config.local.php';
if (file_exists($localConfig)) {
    require_once $localConfig;
}

// Database Configuration
if (!defined('DB_HOST')) {
    define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
}
if (!defined('DB_NAME')) {
    define('DB_NAME', getenv('DB_NAME') ?: 'sgj_college');
}
if (!defined('DB_USER')) {
    define('DB_USER', getenv('DB_USER') ?: 'root');
}
if (!defined('DB_PASS')) {
    define('DB_PASS', getenv('DB_PASS') ?: '');
}
if (!defined('DB_PORT')) {
    define('DB_PORT', (int) (getenv('DB_PORT') ?: 3306));
}

// Fallback enquiry file — stored TWO levels above the web root so it is never
// accessible via HTTP. Adjust the path if your server layout differs.
// Structure assumed:  /home/user/private/          ← outside web root
//                     /home/user/public_html/php/  ← __DIR__ here
if (!defined('ENQUIRY_FALLBACK_FILE')) {
    define('ENQUIRY_FALLBACK_FILE', dirname(__DIR__, 3) . '/private/enquiries_fallback.jsonl');
}

// Site Configuration
if (!defined('SITE_URL')) {
    define('SITE_URL', getenv('SITE_URL') ?: 'https://sgjcollege.in');
}
if (!defined('SITE_NAME')) {
    define('SITE_NAME', 'SGJ Institute of Management & IT');
}

// Security Configuration
if (!defined('ALLOWED_ORIGINS')) {
    define('ALLOWED_ORIGINS', [
        'https://sgjgroup.org',
        'https://www.sgjgroup.org',
        'https://sgjcollege.in',
        'https://www.sgjcollege.in',
        'http://localhost',
        'http://127.0.0.1',
        'http://localhost:8000',
        'http://127.0.0.1:8000',
    ]);
}

// Rate Limiting
if (!defined('RATE_LIMIT_SECONDS')) {
    define('RATE_LIMIT_SECONDS', 30);
}

// Download rate limiting (per IP, per file, per window)
if (!defined('DOWNLOAD_RATE_LIMIT_COUNT')) {
    define('DOWNLOAD_RATE_LIMIT_COUNT', 10);   // max downloads
}
if (!defined('DOWNLOAD_RATE_LIMIT_WINDOW')) {
    define('DOWNLOAD_RATE_LIMIT_WINDOW', 60);  // per this many seconds
}

// Input Validation Limits
if (!defined('MAX_NAME_LENGTH')) {
    define('MAX_NAME_LENGTH', 100);
}
if (!defined('MAX_EMAIL_LENGTH')) {
    define('MAX_EMAIL_LENGTH', 100);
}
if (!defined('MAX_PHONE_LENGTH')) {
    define('MAX_PHONE_LENGTH', 15);
}
if (!defined('MAX_MESSAGE_LENGTH')) {
    define('MAX_MESSAGE_LENGTH', 1000);
}
?>
