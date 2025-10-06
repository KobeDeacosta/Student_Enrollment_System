<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/../db.php";

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    // 📌 Get all semesters
    case "GET":
        $stmt = $conn->query("SELECT sem_id AS semId, sem_name AS semName FROM semesters");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    // 📌 Add a semester
    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        if (!empty($data["semName"])) {
            $stmt = $conn->prepare("INSERT INTO semesters (sem_name) VALUES (?)");
            $stmt->execute([$data["semName"]]);
            echo json_encode(["message" => "Semester added successfully"]);
        } else {
            echo json_encode(["error" => "Semester name is required"]);
        }
        break;

    // 📌 Update a semester
    case "PUT":
        $data = json_decode(file_get_contents("php://input"), true);
        if (!empty($data["semId"]) && !empty($data["semName"])) {
            $stmt = $conn->prepare("UPDATE semesters SET sem_name=? WHERE sem_id=?");
            $stmt->execute([$data["semName"], $data["semId"]]);
            echo json_encode(["message" => "Semester updated successfully"]);
        } else {
            echo json_encode(["error" => "Semester ID and name are required"]);
        }
        break;

    // 📌 Delete a semester
    case "DELETE":
        $data = json_decode(file_get_contents("php://input"), true);
        if (!empty($data["semId"])) {
            $stmt = $conn->prepare("DELETE FROM semesters WHERE sem_id=?");
            $stmt->execute([$data["semId"]]);
            echo json_encode(["message" => "Semester deleted successfully"]);
        } else {
            echo json_encode(["error" => "No semester ID provided"]);
        }
        break;

    default:
        echo json_encode(["error" => "Unsupported request method"]);
}
