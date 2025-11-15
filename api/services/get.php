<?php
header('Content-Type: application/json');
require_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$stmt = $db->query("SELECT * FROM services ORDER BY display_order ASC");
$services = $stmt->fetchAll();

echo json_encode($services);

