<?php
header('Content-Type: application/json');
require_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$stmt = $db->query("SELECT * FROM projects ORDER BY display_order ASC");
$projects = $stmt->fetchAll();

echo json_encode($projects);

