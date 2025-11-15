<?php
header('Content-Type: application/json');
require_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$stmt = $db->query("SELECT * FROM social_links ORDER BY display_order ASC");
$links = $stmt->fetchAll();

echo json_encode($links);

