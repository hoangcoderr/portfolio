<?php
header('Content-Type: application/json');
require_once '../../config/auth.php';
require_once '../../config/database.php';

requireLogin();

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents('php://input'), true);

$stmt = $db->prepare("UPDATE profile SET logo_text = ?, greeting = ?, name = ?, subtitle = ?, about_text = ?, hero_image = ?, cv_file = ? WHERE id = 1");
$stmt->execute([
    $data['logo_text'] ?? '',
    $data['greeting'] ?? '',
    $data['name'] ?? '',
    $data['subtitle'] ?? '',
    $data['about_text'] ?? '',
    $data['hero_image'] ?? '',
    $data['cv_file'] ?? ''
]);

echo json_encode(['success' => true]);

