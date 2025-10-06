<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/../db.php";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    // 📌 OPTIONS (pang-preflight ng CORS)
    case "OPTIONS":
        http_response_code(200);
        exit();

    // 📌 GET all students with joins
    case "GET":
        $stmt = $conn->prepare("
            SELECT 
                s.student_id AS studentId,
                s.student_name AS studentName,
                s.allowance,
                p.program_id AS programId,
                p.program_name AS programName,
                sem.sem_id AS semId,
                sem.sem_name AS semName,
                y.year_id AS yearId,
                y.year_name AS yearName
            FROM students s
            LEFT JOIN programs p ON s.program_id = p.program_id
            LEFT JOIN semesters sem ON s.sem_id = sem.sem_id
            LEFT JOIN years y ON s.year_id = y.year_id
            ORDER BY s.student_id
        ");
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    // 📌 Add new student (auto-increment student_id)
    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);

        $stmt = $conn->prepare("
            INSERT INTO students (student_name, program_id, sem_id, year_id, allowance)
            VALUES (?, ?, ?, ?, ?)
        ");
        $ok = $stmt->execute([
            $data['studentName'],
            $data['programId'],
            $data['semId'],
            $data['yearId'],
            $data['allowance']
        ]);

        echo json_encode($ok ? ["message" => "Student added"] : ["error" => $stmt->errorInfo()]);
        break;

    // 📌 Update student
    case "PUT":
        $data = json_decode(file_get_contents("php://input"), true);

        $stmt = $conn->prepare("
            UPDATE students
            SET student_name=?, program_id=?, sem_id=?, year_id=?, allowance=?
            WHERE student_id=?
        ");
        $ok = $stmt->execute([
            $data['studentName'],
            $data['programId'],
            $data['semId'],
            $data['yearId'],
            $data['allowance'],
            $data['studentId']
        ]);

        echo json_encode($ok ? ["message" => "Student updated"] : ["error" => $stmt->errorInfo()]);
        break;

    // 📌 Delete student
    case "DELETE":
        parse_str($_SERVER["QUERY_STRING"], $params);
        $studentId = $params["id"] ?? null;
    
        if ($studentId) {
            $stmt = $conn->prepare("DELETE FROM students WHERE student_id=?");
            $ok = $stmt->execute([$studentId]);
            echo json_encode($ok ? ["message" => "Student deleted"] : ["error" => $stmt->errorInfo()]);
        } else {
            echo json_encode(["error" => "No studentId provided"]);
        }
        break;    

}
