<?php
require_once 'db.php';

// ADVICE: Delete this file after successfully creating your admin user!

// 1. CHANGE these values to your desired admin credentials
$email = "admin@nesty.ma";
$password = "ChangeMe123!";
$firstName = "Admin";
$lastName = "User";

// 2. Run this script in your browser (e.g., https://yourdomain.com/api/create_admin.php)

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email format");
}

$password_hash = password_hash($password, PASSWORD_BCRYPT);

try {
    $stmt = $conn->prepare("INSERT INTO admin_users (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)");
    $stmt->execute([$email, $password_hash, $firstName, $lastName]);

    echo "<h1>Success!</h1>";
    echo "<p>Admin user <strong>$email</strong> created successfully.</p>";
    echo "<p style='color:red'>PLEASE DELETE THIS FILE (create_admin.php) FROM YOUR SERVER NOW FOR SECURITY.</p>";

} catch (PDOException $e) {
    if ($e->getCode() == 23000) {
        echo "Error: Email already exists.";
    } else {
        echo "Error: " . $e->getMessage();
    }
}
?>