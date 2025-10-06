<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once "../db.php";

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    // === FETCH ENROLLMENTS ===
    case "GET":
        $stmt = $conn->query("
            SELECT 
                e.enroll_id,
                s.student_name,
                sub.subj_name,
                sub.units,
                sub.room,
                sub.schedule,
                sub.day
            FROM enrollment e
            JOIN students s ON e.student_id = s.student_id
            JOIN subjects sub ON e.subj_id = sub.subj_id
        ");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    // === ADD ENROLLMENT ===
    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        $student_id = $data["student_id"] ?? null;
        $subj_id = $data["subj_id"] ?? null;

        if (!$student_id || !$subj_id) {
            echo json_encode(["success" => false, "message" => "Missing student or subject ID"]);
            exit;
        }

        // Prevent duplicate enrollments
        $check = $conn->prepare("SELECT * FROM enrollment WHERE student_id = ? AND subj_id = ?");
        $check->execute([$student_id, $subj_id]);
        if ($check->rowCount() > 0) {
            echo json_encode(["success" => false, "message" => "Student already enrolled in this subject"]);
            exit;
        }

        $stmt = $conn->prepare("INSERT INTO enrollment (student_id, subj_id) VALUES (?, ?)");
        $success = $stmt->execute([$student_id, $subj_id]);

        echo json_encode(["success" => $success]);
        break;

    // === DELETE ENROLLMENT ===
    case "DELETE":
        $id = $_GET["id"] ?? null;
        if (!$id) {
            echo json_encode(["success" => false, "message" => "Missing enrollment ID"]);
            exit;
        }

        $stmt = $conn->prepare("DELETE FROM enrollment WHERE enroll_id = ?");
        $success = $stmt->execute([$id]);

        echo json_encode(["success" => $success]);
        break;
}
?>
