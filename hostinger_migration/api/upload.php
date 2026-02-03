<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_FILES['file'])) {
        $target_dir = "../uploads/";
        if (!file_exists($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        $filename = basename($_FILES["file"]["name"]);
        // Sanitize filename
        $filename = preg_replace("/[^a-zA-Z0-9.]/", "_", $filename);
        $target_file = $target_dir . time() . "_" . $filename;

        $uploadOk = 1;

        // Check if image file is a actual image or fake image
        $check = getimagesize($_FILES["file"]["tmp_name"]);
        if ($check !== false) {
            $uploadOk = 1;
        } else {
            echo json_encode(["error" => "File is not an image."]);
            exit();
        }

        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
            // Return public URL (adjust based on your actual domain structure)
            // Assuming /api and /uploads are siblings in public_html
            // URL should be domain/uploads/filename
            // Or relative path
            $publicUrl = "/uploads/" . basename($target_file);
            echo json_encode(["status" => "success", "url" => $publicUrl]);
        } else {
            echo json_encode(["error" => "Sorry, there was an error uploading your file."]);
        }
    } else {
        echo json_encode(["error" => "No file sent"]);
    }
}
?>