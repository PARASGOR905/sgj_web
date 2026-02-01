<?php
session_start();

// Security check - ensure this file is accessed only through proper requests
if (!isset($_GET['file']) || empty($_GET['file'])) {
    http_response_code(400);
    die('Invalid request');
}

// Define allowed files to prevent unauthorized access
$allowed_files = [
    'BCA_Application_Form.pdf' => 'application/pdf',
    'BBA_Application_Form.pdf' => 'application/pdf',
    'BA_Application_Form.pdf' => 'application/pdf',
    'Academic_Calendar_2023-24.pdf' => 'application/pdf',
    'BCA_Syllabus.pdf' => 'application/pdf',
    'BBA_Syllabus.pdf' => 'application/pdf',
    'BA_Syllabus.pdf' => 'application/pdf',
    'Previous_Year_Papers.zip' => 'application/zip',
    'Study_Materials.zip' => 'application/zip',
    'Notices_List.pdf' => 'application/pdf'
];

$requested_file = basename($_GET['file']); // Prevent directory traversal

if (!array_key_exists($requested_file, $allowed_files)) {
    http_response_code(403);
    die('Access denied');
}

$file_path = __DIR__ . '/../assets/docs/' . $requested_file;

if (!file_exists($file_path)) {
    http_response_code(404);
    die('File not found');
}

// Log the download with size limit check
$log_file = __DIR__ . '/download_log.txt';
$log_message = date('Y-m-d H:i:s') . " - Download: " . $requested_file . " - IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";

// Rotate log if it exceeds 5MB
if (file_exists($log_file) && filesize($log_file) > 5 * 1024 * 1024) {
    $backup_file = __DIR__ . '/download_log_' . date('Y-m-d') . '.txt';
    if (file_exists($backup_file)) {
        unlink($backup_file);
    }
    rename($log_file, $backup_file);
}

file_put_contents($log_file, $log_message, FILE_APPEND);

// Set headers for secure download
$mimetype = $allowed_files[$requested_file];
header('Content-Type: ' . $mimetype);
header('Content-Disposition: attachment; filename="' . basename($file_path) . '"');
header('Content-Length: ' . filesize($file_path));
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// Output file content
readfile($file_path);

// Optionally track statistics in database
if (isset($_SESSION['user_id']) || isset($_GET['track'])) {
    // This would connect to database to track downloads if needed
    // For now, we'll just log to file
}

exit();
?>