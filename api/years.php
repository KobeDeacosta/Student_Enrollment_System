<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/../db.php";

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "GET":
        $stmt = $conn->query("SELECT year_id AS yearId, year_name AS yearName FROM years");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        if (!empty($data["yearName"])) {
            $stmt = $conn->prepare("INSERT INTO years (year_name) VALUES (?)");
            $stmt->execute([$data["yearName"]]);
            echo json_encode(["message" => "Year added successfully"]);
        } else {
            echo json_encode(["error" => "Year name is required"]);
        }
        break;

    case "PUT":
        $data = json_decode(file_get_contents("php://input"), true);
        if (!empty($data["yearId"]) && !empty($data["yearName"])) {
            $stmt = $conn->prepare("UPDATE years SET year_name=? WHERE year_id=?");
            $stmt->execute([$data["yearName"], $data["yearId"]]);
            echo json_encode(["message" => "Year updated successfully"]);
        } else {
            echo json_encode(["error" => "Invalid input"]);
        }
        break;

    case "DELETE":
        if (!empty($_GET["id"])) {
            $stmt = $conn->prepare("DELETE FROM years WHERE year_id=?");
            $stmt->execute([$_GET["id"]]);
            echo json_encode(["message" => "Year deleted successfully"]);
        } else {
            echo json_encode(["error" => "No ID provided"]);
        }
        break;

    default:
        echo json_encode(["error" => "Method not allowed"]);
        break;
}
