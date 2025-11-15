<?php
header('Content-Type: application/json');
require_once '../../config/auth.php';
require_once '../../config/database.php';

requireLogin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'No file uploaded or upload error']);
    exit;
}

$file = $_FILES['image'];
$allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
$maxSize = 5 * 1024 * 1024;

if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG']);
    exit;
}

if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['error' => 'File size exceeds 5MB limit']);
    exit;
}

$type = $_POST['type'] ?? 'general';
$typeMap = [
    'hero' => 'hero',
    'service' => 'services',
    'achievement' => 'achievements',
    'project' => 'works',
    'social' => 'social_icons',
    'general' => ''
];

$subfolder = $typeMap[$type] ?? '';
$uploadDir = '../../img/' . ($subfolder ? $subfolder . '/' : '');
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$fileName = uniqid('img_', true) . '.' . $extension;
$filePath = $uploadDir . $fileName;

if (!move_uploaded_file($file['tmp_name'], $filePath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save file']);
    exit;
}

$relativePath = 'img/' . ($subfolder ? $subfolder . '/' : '') . $fileName;
echo json_encode(['success' => true, 'path' => $relativePath]);

