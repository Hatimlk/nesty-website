<?php
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $stmt = $conn->prepare("SELECT * FROM messages ORDER BY created_at DESC");
    $stmt->execute();
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Map fields to match Frontend
    foreach ($messages as &$msg) {
        $msg['date'] = $msg['created_at'];
        $msg['read'] = (bool) $msg['is_read'];
    }

    echo json_encode($messages);
}

if ($method == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $conn->prepare("INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['name'],
        $data['email'],
        $data['phone'],
        $data['subject'],
        $data['message']
    ]);

    echo json_encode(["status" => "success", "id" => $conn->lastInsertId()]);
}
?>