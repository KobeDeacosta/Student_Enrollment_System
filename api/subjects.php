<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/../db.php";

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "GET":
        $stmt = $conn->query("
            SELECT 
                subject_id AS subjId, 
                subject_name AS subjName, 
                units AS subjUnits,
                room, 
                DATE_FORMAT(start_time, '%h:%i %p') AS startTime,
                DATE_FORMAT(end_time, '%h:%i %p') AS endTime,
                day
            FROM subjects
        ");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // combine start and end time for display
        foreach ($rows as &$row) {
            $row["timeRange"] = $row["startTime"] . ' - ' . $row["endTime"];
        }

        echo json_encode($rows);
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $conn->prepare("
            INSERT INTO subjects (subject_name, units, room, start_time, end_time, day)
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        $ok = $stmt->execute([
            $data["subjName"],
            $data["subjUnits"],
            $data["room"],
            $data["startTime"],
            $data["endTime"],
            $data["day"]
        ]);
        echo json_encode($ok ? ["message" => "Subject added successfully"] : ["error" => $stmt->errorInfo()]);
        break;

    case "PUT":
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $conn->prepare("
            UPDATE subjects
            SET subject_name=?, units=?, room=?, start_time=?, end_time=?, day=?
            WHERE subject_id=?
        ");
        $ok = $stmt->execute([
            $data["subjName"],
            $data["subjUnits"],
            $data["room"],
            $data["startTime"],
            $data["endTime"],
            $data["day"],
            $data["subjId"]
        ]);
        echo json_encode($ok ? ["message" => "Subject updated successfully"] : ["error" => $stmt->errorInfo()]);
        break;

    case "DELETE":
        $data = json_decode(file_get_contents("php://input"), true);
        if (!empty($data["subjId"])) {
            $stmt = $conn->prepare("DELETE FROM subjects WHERE subject_id=?");
            $ok = $stmt->execute([$data["subjId"]]);
            echo json_encode($ok ? ["message" => "Subject deleted successfully"] : ["error" => $stmt->errorInfo()]);
        } else {
            echo json_encode(["error" => "No subject ID provided"]);
        }
        break;
}
