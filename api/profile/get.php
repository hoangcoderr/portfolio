<?php
header('Content-Type: application/json');
require_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$stmt = $db->query("SELECT * FROM profile LIMIT 1");
$profile = $stmt->fetch();

echo json_encode($profile ?: []);

