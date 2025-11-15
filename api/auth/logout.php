<?php
header('Content-Type: application/json');
require_once '../../config/auth.php';

logout();
echo json_encode(['success' => true, 'message' => 'Logged out']);

