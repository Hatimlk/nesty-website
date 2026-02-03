<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

$host = "localhost";
$db_name = "u855566147_nesty"; // CHANGE THIS to your Hostinger DB Name
$username = "u855566147_o_nesty";     // CHANGE THIS to your Hostinger DB User
$password = ";y2AR:liiNSv";    // CHANGE THIS to your Hostinger DB Password

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
    exit();
}
?>