<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/../db.php";

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    // 📌 GET all programs
    case "GET":
        $stmt = $conn->query("
            SELECT 
                program_id AS programId,
                program_name AS programName
            FROM programs
        ");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    // 📌 Add new program
    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data["programName"])) {
            echo json_encode(["error" => "Missing programName"]);
            exit;
        }

        $stmt = $conn->prepare("INSERT INTO programs (program_name) VALUES (?)");
        $stmt->execute([$data["programName"]]);

        echo json_encode(["message" => "Program added successfully"]);
        break;

    // 📌 Update program
    case "PUT":
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data["programId"]) || empty($data["programName"])) {
            echo json_encode(["error" => "Missing programId or programName"]);
            exit;
        }

        $stmt = $conn->prepare("UPDATE programs SET program_name=? WHERE program_id=?");
        $stmt->execute([$data["programName"], $data["programId"]]);

        echo json_encode(["message" => "Program updated successfully"]);
        break;

    // 📌 Delete program
    case "DELETE":
        // Support both ?id= and JSON body
        parse_str($_SERVER["QUERY_STRING"], $query);
        $data = json_decode(file_get_contents("php://input"), true);

        $programId = $query["id"] ?? ($data["programId"] ?? null);

        if (!$programId) {
            echo json_encode(["error" => "No programId provided"]);
            exit;
        }

        $stmt = $conn->prepare("DELETE FROM programs WHERE program_id=?");
        $stmt->execute([$programId]);

        echo json_encode(["message" => "Program deleted successfully"]);
        break;
}
