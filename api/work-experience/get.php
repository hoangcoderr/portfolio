<?php
header('Content-Type: application/json');
require_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$stmt = $db->query("SELECT * FROM work_experience ORDER BY display_order ASC");
$work = $stmt->fetchAll();

echo json_encode($work);

