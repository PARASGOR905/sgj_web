<?php
// SGJ Institute Contact Form Processing
// Handle form submissions securely

// Load configuration first
require_once __DIR__ . '/config.php';

// Use a project-local session directory when available.
$session_dir = __DIR__ . '/sessions';
if (!is_dir($session_dir)) {
    @mkdir($session_dir, 0775, true);
}
if (is_dir($session_dir) && is_writable($session_dir)) {
    session_save_path($session_dir);
}

// Start session for CSRF and rate limiting
session_start();

header('Content-Type: application/json');

function refresh_security_state() {
    $_SESSION['last_submission'] = time();
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    $_SESSION['csrf_token_time'] = time();
    return $_SESSION['csrf_token'];
}

function store_enquiry_fallback($name, $email, $phone, $course, $message) {
    $payload = [
        'stored_at' => date('c'),
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'course' => $course,
        'message' => $message,
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
    ];

    $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        return false;
    }

    return file_put_contents(ENQUIRY_FALLBACK_FILE, $json . PHP_EOL, FILE_APPEND | LOCK_EX) !== false;
}

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
    $_SESSION['csrf_token_time'] = time();
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

// Process the form
try {
    // Include database connection
    require_once __DIR__ . '/db_connect.php';

    // Get database connection
    $db = getDB();

    // Prepare and execute database insertion
    $sql = 'INSERT INTO enquiries (name, email, phone, course, message, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)';
    $params = [
        $name,
        $email,
        $phone,
        $course,
        $message,
        $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
    ];

    $db->query($sql, $params);

    $new_token = refresh_security_state();

    // Log successful submission
    error_log('Contact form submission successful: ' . $email);

    echo json_encode([
        'status' => 'success',
        'message' => 'Thank you for your enquiry! We will contact you within 24 working hours.',
        'token' => $new_token,
        'stored' => 'database'
    ]);

    // Close session write
    session_write_close();
} catch (Exception $e) {
    error_log('Contact form storage error: ' . $e->getMessage());

    // Fallback: store enquiry in local file when database is unavailable.
    if (store_enquiry_fallback($name, $email, $phone, $course, $message)) {
        $new_token = refresh_security_state();

        echo json_encode([
            'status' => 'success',
            'message' => 'Thank you for your enquiry! We have received your details and will contact you soon.',
            'token' => $new_token,
            'stored' => 'fallback'
        ]);

        session_write_close();
        exit;
    }

    echo json_encode([
        'status' => 'error',
        'message' => 'Unable to submit your enquiry right now. Please try again later.'
    ]);
}
?>
