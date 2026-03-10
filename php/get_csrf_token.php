<?php
// CSRF Token Generator for SGJ Institute
// Provides secure tokens for form protection

header('Content-Type: application/json');

// Load configuration
require_once __DIR__ . '/config.php';

// Use a project-local session directory when available.
$session_dir = __DIR__ . '/sessions';
if (!is_dir($session_dir)) {
    @mkdir($session_dir, 0775, true);
}
if (is_dir($session_dir) && is_writable($session_dir)) {
    session_save_path($session_dir);
}

session_start();

// Generate or refresh token every hour for security
if (
    !isset($_SESSION['csrf_token']) ||
    !isset($_SESSION['csrf_token_time']) ||
    (time() - $_SESSION['csrf_token_time']) > 3600
) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    $_SESSION['csrf_token_time'] = time();
}

echo json_encode([
    'token' => $_SESSION['csrf_token'],
    'expires_in' => 3600 // Token expires in 1 hour
]);
?>
