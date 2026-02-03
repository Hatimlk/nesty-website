<?php
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    // Fetch all properties
    $stmt = $conn->prepare("SELECT * FROM properties ORDER BY created_at DESC");
    $stmt->execute();
    $properties = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Fetch related images and amenities for each property
    foreach ($properties as &$prop) {
        $id = $prop['id'];

        $imgStmt = $conn->prepare("SELECT image_url FROM property_images WHERE property_id = ?");
        $imgStmt->execute([$id]);
        $prop['images'] = $imgStmt->fetchAll(PDO::FETCH_COLUMN);

        $amenityStmt = $conn->prepare("SELECT amenity FROM property_amenities WHERE property_id = ?");
        $amenityStmt->execute([$id]);
        $prop['amenities'] = $amenityStmt->fetchAll(PDO::FETCH_COLUMN);

        // Map flat fields back to nested 'specs' object to match Frontend expectations
        $prop['specs'] = [
            'surface' => $prop['surface'],
            'rooms' => $prop['rooms'],
            'roomsDisplay' => $prop['rooms_display'],
            'roi' => $prop['roi']
        ];

        // Remove flat fields if you want cleaner JSON
        // unset($prop['surface'], $prop['rooms'], $prop['rooms_display'], $prop['roi']);
    }

    echo json_encode($properties);
}

if ($method == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['title'])) {
        echo json_encode(["error" => "Invalid input"]);
        exit();
    }

    $sql = "INSERT INTO properties (title, location, type, raw_price, display_price, surface, rooms, rooms_display, roi, description, main_image, is_sold) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->execute([
        $data['title'],
        $data['location'],
        $data['type'],
        $data['rawPrice'],
        $data['displayPrice'],
        $data['specs']['surface'],
        $data['specs']['rooms'],
        $data['specs']['roomsDisplay'],
        $data['specs']['roi'],
        $data['description'],
        $data['image'],
        isset($data['isSold']) ? $data['isSold'] : 0
    ]);

    $propertyId = $conn->lastInsertId();

    // Insert Images
    if (!empty($data['images'])) {
        $imgSql = "INSERT INTO property_images (property_id, image_url) VALUES (?, ?)";
        $imgStmt = $conn->prepare($imgSql);
        foreach ($data['images'] as $img) {
            $imgStmt->execute([$propertyId, $img]);
        }
    }

    // Insert Amenities
    if (!empty($data['amenities'])) {
        $amSql = "INSERT INTO property_amenities (property_id, amenity) VALUES (?, ?)";
        $amStmt = $conn->prepare($amSql);
        foreach ($data['amenities'] as $am) {
            $amStmt->execute([$propertyId, $am]);
        }
    }

    echo json_encode(["status" => "success", "id" => $propertyId]);
}

if ($method == 'DELETE') {
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    if (!$id) {
        echo json_encode(["error" => "ID required"]);
        exit();
    }

    $stmt = $conn->prepare("DELETE FROM properties WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode(["status" => "deleted"]);
}
?>