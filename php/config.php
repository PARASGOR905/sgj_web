<?php
// Configuration file for SGJ Institute
// IMPORTANT: In production, move sensitive data to environment variables

// Database Configuration
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'sgj_college');
define('DB_USER', getenv('DB_USER') ?: 'sgj_user');
define('DB_PASS', getenv('DB_PASS') ?: 'sgjpassword123');

// Site Configuration
define('SITE_URL', getenv('SITE_URL') ?: 'https://sgjcollege.in');
define('SITE_NAME', 'SGJ Institute of Management & IT');

// Security Configuration
define('ALLOWED_ORIGINS', [
    'https://sgjcollege.in',
    'https://www.sgjcollege.in',
    'http://localhost',
    'http://127.0.0.1'
]);

// Rate Limiting
define('RATE_LIMIT_SECONDS', 30);

// Input Validation Limits
define('MAX_NAME_LENGTH', 100);
define('MAX_EMAIL_LENGTH', 100);
define('MAX_PHONE_LENGTH', 15);
define('MAX_MESSAGE_LENGTH', 1000);
?>
