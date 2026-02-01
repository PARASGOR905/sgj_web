<?php
// CSRF Token Generator for SGJ Institute
// Provides secure tokens for form protection

header('Content-Type: application/json');

// Load configuration
require_once __DIR__ . '/config.php';

session_start();

// Generate CSRF token if not exists
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Regenerate token every hour for security
if (!isset($_SESSION['csrf_token_time']) || (time() - $_SESSION['csrf_token_time']) > 3600) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    $_SESSION['csrf_token_time'] = time();
}

echo json_encode([
    'token' => $_SESSION['csrf_token'],
    'expires_in' => 3600 // Token expires in 1 hour
]);
?>