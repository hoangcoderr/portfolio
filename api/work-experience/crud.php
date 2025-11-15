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
        $stmt = $db->prepare("INSERT INTO work_experience (year_from, year_to, title, company, location, description, display_order) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['year_from'] ?? '',
            $data['year_to'] ?? '',
            $data['title'] ?? '',
            $data['company'] ?? '',
            $data['location'] ?? '',
            $data['description'] ?? '',
            $data['display_order'] ?? 0
        ]);
        echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);
        break;
        
    case 'PUT':
        $stmt = $db->prepare("UPDATE work_experience SET year_from = ?, year_to = ?, title = ?, company = ?, location = ?, description = ?, display_order = ? WHERE id = ?");
        $stmt->execute([
            $data['year_from'] ?? '',
            $data['year_to'] ?? '',
            $data['title'] ?? '',
            $data['company'] ?? '',
            $data['location'] ?? '',
            $data['description'] ?? '',
            $data['display_order'] ?? 0,
            $data['id'] ?? 0
        ]);
        echo json_encode(['success' => true]);
        break;
        
    case 'DELETE':
        $id = (int)($_GET['id'] ?? 0);
        $stmt = $db->prepare("DELETE FROM work_experience WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

