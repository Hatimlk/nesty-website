<?php
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(["error" => "Email and password required"]);
        exit();
    }

    $stmt = $conn->prepare("SELECT * FROM admin_users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verify Password (In production, use password_verify with hashed passwords)
    // For migration simplicity, assuming we might manually set passwords or use plain text initially
    // BUT we should recommend hashing.
    // Let's assume the user will insert a hashed password in DB or we use simple check for now if they manually insert.
    // I will write it to expect a HASH.

    // NOTE: To create the first admin, you'll need to generate a hash.
    // password_verify($password, $user['password_hash'])

    if ($user && password_verify($password, $user['password_hash'])) {
        // Success
        // Generate a simple token or just return user info
        echo json_encode([
            "status" => "success",
            "user" => [
                "id" => $user['id'],
                "email" => $user['email'],
                "firstName" => $user['first_name'],
                "lastName" => $user['last_name']
            ]
        ]);
    } else {
        echo json_encode(["error" => "Invalid credentials"]);
    }
}
?>