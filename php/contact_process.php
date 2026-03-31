<?php
// SGJ Institute Contact Form Processing
// Handle form submissions securely

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

header('Content-Type: application/json');

/**
 * Rotate the CSRF token and reset the rate-limit timestamp.
 * Always returns the new token so callers can include it in the response.
 */
function refresh_security_state(): string {
    $_SESSION['last_submission']  = time();
    $_SESSION['csrf_token']       = bin2hex(random_bytes(32));
    $_SESSION['csrf_token_time']  = time();
    return $_SESSION['csrf_token'];
}

/**
 * Write the enquiry to a JSONL file outside the web root.
 * Used as a fallback when the database is unavailable.
 */
function store_enquiry_fallback(
    string $name, string $email, string $phone,
    string $course, string $message
): bool {
    $payload = [
        'stored_at'  => date('c'),
        'name'       => $name,
        'email'      => $email,
        'phone'      => $phone,
        'course'     => $course,
        'message'    => $message,
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
    ];

    $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        return false;
    }

    // Ensure the target directory exists (it lives outside the web root).
    $dir = dirname(ENQUIRY_FALLBACK_FILE);
    if (!is_dir($dir)) {
        @mkdir($dir, 0750, true);
    }

    return file_put_contents(
        ENQUIRY_FALLBACK_FILE,
        $json . PHP_EOL,
        FILE_APPEND | LOCK_EX
    ) !== false;
}

// ─── CORS ────────────────────────────────────────────────────────────────────
$origin         = $_SERVER['HTTP_ORIGIN'] ?? '';
$scheme         = (($_SERVER['HTTPS'] ?? '') === 'on') ? 'https://' : 'http://';
$current_origin = $scheme . ($_SERVER['HTTP_HOST'] ?? '');

$is_same_origin      = !empty($origin) && hash_equals($current_origin, $origin);
$is_allowlisted      = !empty($origin) && in_array($origin, ALLOWED_ORIGINS, true);
$is_allowed          = empty($origin) || $is_same_origin || $is_allowlisted;

if ($is_allowed && !empty($origin)) {
    header('Access-Control-Allow-Origin: '   . $origin);
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
    header('Access-Control-Allow-Credentials: true');
} elseif (!empty($origin) && !$is_allowed) {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Access denied']);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only accept POST
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

// ─── Rate limiting ────────────────────────────────────────────────────────────
if (!isset($_SESSION['last_submission'])) {
    $_SESSION['last_submission'] = 0;
}
if (time() - $_SESSION['last_submission'] < RATE_LIMIT_SECONDS) {
    echo json_encode([
        'status'  => 'error',
        'message' => 'Please wait ' . RATE_LIMIT_SECONDS . ' seconds between submissions.',
    ]);
    exit;
}

// ─── CSRF validation ─────────────────────────────────────────────────────────
// Initialise token if the session is brand-new (e.g. cookies disabled edge case).
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token']      = bin2hex(random_bytes(32));
    $_SESSION['csrf_token_time'] = time();
}

$submitted_token = $_POST['csrf_token'] ?? '';
if (
    $submitted_token === '' ||
    !hash_equals($_SESSION['csrf_token'], $submitted_token)
) {
    // Return a fresh token in the response so the client can retry without
    // a page reload — fixes the "stale token after error" bug.
    $fresh_token = bin2hex(random_bytes(32));
    $_SESSION['csrf_token']      = $fresh_token;
    $_SESSION['csrf_token_time'] = time();

    echo json_encode([
        'status'  => 'error',
        'message' => 'Invalid security token. Please try again.',
        'token'   => $fresh_token,
    ]);
    exit;
}

// ─── Input validation ─────────────────────────────────────────────────────────
$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$phone   = trim($_POST['phone']   ?? '');
$course  = trim($_POST['course']  ?? '');
$message = trim($_POST['message'] ?? '');

$errors = [];

if ($name === '') {
    $errors[] = 'Name is required';
} elseif (strlen($name) < 2) {
    $errors[] = 'Name must be at least 2 characters';
} elseif (strlen($name) > MAX_NAME_LENGTH) {
    $errors[] = 'Name must not exceed ' . MAX_NAME_LENGTH . ' characters';
}

if ($email === '') {
    $errors[] = 'Email is required';
} elseif (strlen($email) > MAX_EMAIL_LENGTH) {
    $errors[] = 'Email must not exceed ' . MAX_EMAIL_LENGTH . ' characters';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Valid email is required';
}

if ($phone === '') {
    $errors[] = 'Phone number is required';
} elseif (strlen($phone) > MAX_PHONE_LENGTH) {
    $errors[] = 'Phone number is too long';
} elseif (!preg_match('/^[0-9]{10}$/', $phone)) {
    $errors[] = 'Valid 10-digit phone number is required';
}

if ($course === '') {
    $errors[] = 'Course selection is required';
} elseif (!in_array($course, ['bca', 'bba', 'ba'], true)) {
    $errors[] = 'Invalid course selection';
}

if (strlen($message) > MAX_MESSAGE_LENGTH) {
    $errors[] = 'Message must not exceed ' . MAX_MESSAGE_LENGTH . ' characters';
}

if (!empty($errors)) {
    echo json_encode([
        'status'  => 'error',
        'message' => implode(', ', $errors),
    ]);
    exit;
}

// ─── Persist enquiry ──────────────────────────────────────────────────────────
try {
    require_once __DIR__ . '/db_connect.php';

    $db  = getDB();
    $sql = 'INSERT INTO enquiries
                (name, email, phone, course, message, ip_address, user_agent)
            VALUES (?, ?, ?, ?, ?, ?, ?)';

    $db->query($sql, [
        $name,
        $email,
        $phone,
        $course,
        $message,
        $_SERVER['REMOTE_ADDR']    ?? 'unknown',
        $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
    ]);

    $new_token = refresh_security_state();

    // Log without PII — use a hash for correlation only.
    error_log('Contact form submission stored. hash=' . substr(hash('sha256', $email), 0, 12));

    echo json_encode([
        'status'  => 'success',
        'message' => 'Thank you for your enquiry! We will contact you within 24 working hours.',
        'token'   => $new_token,
        'stored'  => 'database',
    ]);

    session_write_close();

} catch (Exception $e) {
    error_log('Contact form DB error: ' . $e->getMessage());

    // Fallback: write to file outside web root.
    if (store_enquiry_fallback($name, $email, $phone, $course, $message)) {
        $new_token = refresh_security_state();

        echo json_encode([
            'status'  => 'success',
            'message' => 'Thank you for your enquiry! We have received your details and will contact you soon.',
            'token'   => $new_token,
            'stored'  => 'fallback',
        ]);

        session_write_close();
        exit;
    }

    // Both storage paths failed — do NOT refresh the token so the user can retry.
    echo json_encode([
        'status'  => 'error',
        'message' => 'Unable to submit your enquiry right now. Please try again later.',
    ]);
}
?>
