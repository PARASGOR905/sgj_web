<?php
// SGJ Institute Contact Form Processing
// Handle form submissions securely

// Load configuration
require_once __DIR__ . '/config.php';

header('Content-Type: application/json');

// Secure CORS - only allow specific origins
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$current_host = ($_SERVER['HTTPS'] ?? '' === 'on' ? 'https://' : 'http://') . ($_SERVER['HTTP_HOST'] ?? '');

// Check if origin is allowed
$is_allowed = false;
if (!empty($origin) && in_array($origin, ALLOWED_ORIGINS)) {
    $is_allowed = true;
} elseif (empty($origin) || in_array($current_host, ALLOWED_ORIGINS)) {
    // Same-origin request or current host is allowed
    $is_allowed = true;
}

if ($is_allowed && !empty($origin)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true');
} elseif (!empty($origin) && !$is_allowed) {
    // Origin not allowed
    http_response_code(403);
    echo json_encode([
        'status' => 'error',
        'message' => 'Access denied'
    ]);
    exit;
}

// Rate limiting - prevent spam
session_start();
if (!isset($_SESSION['last_submission'])) {
    $_SESSION['last_submission'] = 0;
}
if (time() - $_SESSION['last_submission'] < RATE_LIMIT_SECONDS) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Please wait ' . RATE_LIMIT_SECONDS . ' seconds between submissions.'
    ]);
    exit;
}

// Initialize CSRF token if not exists
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Validate CSRF token
if (!isset($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'] ?? '', $_POST['csrf_token'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid security token. Please refresh the page and try again.'
    ]);
    exit;
}

// Sanitize and validate input
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$course = trim($_POST['course'] ?? '');
$message = trim($_POST['message'] ?? '');

$errors = [];

// Validation with length limits
if (empty($name)) {
    $errors[] = 'Name is required';
} elseif (strlen($name) < 2) {
    $errors[] = 'Name must be at least 2 characters';
} elseif (strlen($name) > MAX_NAME_LENGTH) {
    $errors[] = 'Name must not exceed ' . MAX_NAME_LENGTH . ' characters';
}

if (empty($email)) {
    $errors[] = 'Email is required';
} elseif (strlen($email) > MAX_EMAIL_LENGTH) {
    $errors[] = 'Email must not exceed ' . MAX_EMAIL_LENGTH . ' characters';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Valid email is required';
}

if (empty($phone)) {
    $errors[] = 'Phone number is required';
} elseif (strlen($phone) > MAX_PHONE_LENGTH) {
    $errors[] = 'Phone number must not exceed ' . MAX_PHONE_LENGTH . ' characters';
} elseif (!preg_match('/^[0-9]{10}$/', $phone)) {
    $errors[] = 'Valid 10-digit phone number is required';
}

if (empty($course)) {
    $errors[] = 'Course selection is required';
} elseif (!in_array($course, ['bca', 'bba', 'ba'])) {
    $errors[] = 'Invalid course selection';
}

if (strlen($message) > MAX_MESSAGE_LENGTH) {
    $errors[] = 'Message must not exceed ' . MAX_MESSAGE_LENGTH . ' characters';
}

// If validation fails
if (!empty($errors)) {
    echo json_encode([
        'status' => 'error',
        'message' => implode(', ', $errors)
    ]);
    exit;
}

// Process the form (save to database, send email, etc.)
try {
    // Include database connection
    require_once 'db_connect.php';
    
    // Get database connection
    $db = getDB();
    
    // Prepare and execute database insertion
    $sql = "INSERT INTO enquiries (name, email, phone, course, message, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $params = [
        $name,
        $email,
        $phone,
        $course,
        $message,
        $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
    ];
    
    $stmt = $db->query($sql, $params);
    
    // Update rate limiting
    $_SESSION['last_submission'] = time();
    
    // Generate new CSRF token
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Thank you for your enquiry! We will contact you within 24 working hours.',
        'token' => $_SESSION['csrf_token']
    ]);
    
} catch (PDOException $e) {
    error_log('Contact form database error: ' . $e->getMessage());
    echo json_encode([
        'status' => 'error',
        'message' => 'Database connection error. Please try again later or contact us directly.'
    ]);
} catch (Exception $e) {
    error_log('Contact form error: ' . $e->getMessage());
    echo json_encode([
        'status' => 'error',
        'message' => 'Sorry, there was an error processing your request. Please try again later.'
    ]);
}
?>