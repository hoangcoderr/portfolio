<?php
header('Content-Type: application/json');
require_once '../../config/auth.php';
require_once '../../config/database.php';

requireLogin();

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'POST':
        $stmt = $db->prepare("INSERT INTO skills (name, percentage, display_order) VALUES (?, ?, ?)");
        $stmt->execute([
            $data['name'] ?? '',
            $data['percentage'] ?? 0,
            $data['display_order'] ?? 0
        ]);
        echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);
        break;
        
    case 'PUT':
        $stmt = $db->prepare("UPDATE skills SET name = ?, percentage = ?, display_order = ? WHERE id = ?");
        $stmt->execute([
            $data['name'] ?? '',
            $data['percentage'] ?? 0,
            $data['display_order'] ?? 0,
            $data['id'] ?? 0
        ]);
        echo json_encode(['success' => true]);
        break;
        
    case 'DELETE':
        $id = (int)($_GET['id'] ?? 0);
        $stmt = $db->prepare("DELETE FROM skills WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

