<?php
// SGJ Institute — Secure File Download Handler

require_once __DIR__ . '/config.php';

// ─── Session ──────────────────────────────────────────────────────────────────
$session_dir = __DIR__ . '/sessions';
if (!is_dir($session_dir)) {
    @mkdir($session_dir, 0775, true);
}
if (is_dir($session_dir) && is_writable($session_dir)) {
    session_save_path($session_dir);
}
session_start();

// ─── Validate request ─────────────────────────────────────────────────────────
if (empty($_GET['file'])) {
    http_response_code(400);
    exit('Invalid request');
}

// ─── Allowed files allowlist ──────────────────────────────────────────────────
// Update Academic_Calendar filename each year.
$allowed_files = [
    'BCA_Application_Form.pdf'     => 'application/pdf',
    'BBA_Application_Form.pdf'     => 'application/pdf',
    'BA_Application_Form.pdf'      => 'application/pdf',
    'Academic_Calendar_2025-26.pdf'=> 'application/pdf',  // updated from 2023-24
    'BCA_Syllabus.pdf'             => 'application/pdf',
    'BBA_Syllabus.pdf'             => 'application/pdf',
    'BA_Syllabus.pdf'              => 'application/pdf',
    'Previous_Year_Papers.zip'     => 'application/zip',
    'Study_Materials.zip'          => 'application/zip',
    'Notices_List.pdf'             => 'application/pdf',
];

$requested_file = basename($_GET['file']); // strips any path traversal

if (!array_key_exists($requested_file, $allowed_files)) {
    http_response_code(403);
    exit('Access denied');
}

$file_path = __DIR__ . '/../assets/docs/' . $requested_file;

if (!file_exists($file_path)) {
    http_response_code(404);
    exit('File not found');
}

// ─── Session-based rate limiting ──────────────────────────────────────────────
// Tracks per-session download count in a rolling window.
$now    = time();
$window = DOWNLOAD_RATE_LIMIT_WINDOW;   // seconds (default 60)
$limit  = DOWNLOAD_RATE_LIMIT_COUNT;    // max downloads (default 10)

if (!isset($_SESSION['dl_log']) || !is_array($_SESSION['dl_log'])) {
    $_SESSION['dl_log'] = [];
}

// Remove entries older than the window.
$_SESSION['dl_log'] = array_filter(
    $_SESSION['dl_log'],
    fn(int $t) => ($now - $t) < $window
);

if (count($_SESSION['dl_log']) >= $limit) {
    http_response_code(429);
    exit('Too many downloads. Please wait a moment and try again.');
}

$_SESSION['dl_log'][] = $now;

// ─── Logging — write to a file outside the web root ───────────────────────────
// Move the log two levels above public_html so it is never HTTP-accessible.
$log_file    = dirname(__DIR__, 3) . '/private/download_log.txt';
$log_dir     = dirname($log_file);
if (!is_dir($log_dir)) {
    @mkdir($log_dir, 0750, true);
}

$log_message = date('Y-m-d H:i:s')
    . ' | ' . $requested_file
    . ' | ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown')
    . PHP_EOL;

// Rotate if file exceeds 5 MB.
if (file_exists($log_file) && filesize($log_file) > 5 * 1024 * 1024) {
    $backup = $log_dir . '/download_log_' . date('Y-m-d') . '.txt';
    if (file_exists($backup)) {
        unlink($backup);
    }
    rename($log_file, $backup);
}

@file_put_contents($log_file, $log_message, FILE_APPEND | LOCK_EX);

// ─── Serve the file ───────────────────────────────────────────────────────────
$mimetype = $allowed_files[$requested_file];
header('Content-Type: '        . $mimetype);
header('Content-Disposition: attachment; filename="' . $requested_file . '"');
header('Content-Length: '      . filesize($file_path));
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

readfile($file_path);
exit();
?>
