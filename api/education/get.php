<?php
header('Content-Type: application/json');
require_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$stmt = $db->query("SELECT * FROM education ORDER BY display_order ASC");
$education = $stmt->fetchAll();

echo json_encode($education);

