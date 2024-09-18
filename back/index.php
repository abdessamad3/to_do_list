<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers
header('Content-Type: application/json');

// Paramètres de connexion à MySQL
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todolist";

// Créer la connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die(json_encode(["error" => "Échec de la connexion : " . $conn->connect_error]));
    exit;
}
// Get the HTTP method and data
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'POST':
        if (isset($_GET['action'])) {
            switch ($_GET['action']) {
                case 'create':
                    // Create
                    $nom = $data['nom'] ?? '';
                    $date = $data['date'] ?? '';
                    $done = $data['done'] ?? '';
                    $done_int = $done? 1 : 0;
                    $id =$data['id'] ?? '';

                    if (empty($nom) || empty($date) ) {
                        echo json_encode(['error' => 'All fields are requireds.'.$id.$done_int . $date . $nom]);
                        exit;
                    }

                    $stmt = $conn->prepare("INSERT INTO tasks (id, nom, date, done) VALUES (?, ?, ?, ?)");
                    $stmt->bind_param("issi", $id, $nom, $date, $done_int);

                    if ($stmt->execute()) {
                        echo json_encode(['success' => 'task created successfully'.$id]);
                    } else {
                        echo json_encode(['error' => 'Error: '. $stmt->error]);
                    }

                    $stmt->close();
                    break;

                case 'update':
                    // Update
                    $id = $data['id'] ?? '';
                    $nom = $data['nom'] ?? '';
                    $date = $data['date'] ?? '';
                    $done = $data['done'] ? 1 : 0;

                    if (empty($nom) || empty($date)) {
                        echo json_encode(['error' => 'All fields are required.']);
                        exit;
                    }

                    $stmt = $conn->prepare("UPDATE tasks SET nom=?, date=?, done=? WHERE id=?");
                    $stmt->bind_param("ssii", $nom, $date, $done, $id);

                    if ($stmt->execute()) {
                        echo json_encode(['success' => 'tasks updated successfully'.$id]);
                    } else {
                        echo json_encode(['erro' => 'Error: ' .$_GET['action']  . $stmt->error]);
                    }

                    $stmt->close();
                    break;

                case 'delete':
                    // Delete
                    $id = $data['id'] ?? '';

                    if (empty($id)) {
                        echo json_encode(['error' => 'ID is required.' . $id]);
                        exit;
                    }

                    $stmt = $conn->prepare("DELETE FROM tasks WHERE id=?");
                    if ($stmt === false) {
                        echo json_encode(['error' => 'Failed to prepare the SQL statement.']);
                        exit;
                    }       
                    $stmt->bind_param("i", $id);

                    if ($stmt->execute()) {
                        echo json_encode(['success' => 'tasks deleted successfully']);
                    } else {
                        echo json_encode(['error' => 'Error: ' .$_GET['action']  . $stmt->error]);
                    }
                    $stmt->close();
                    break;

                default:
                    echo json_encode(['error' => 'Invalid action']);
            }
        } else {
            echo json_encode(['error' => 'Action parameter is required']);
        }
        break;

    case 'GET':
        // Read
        $sql = "SELECT id, nom, date ,done FROM tasks";
        $result = $conn->query($sql);
        

        $tasks = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $tasks[] = $row;
            }
        }

        echo json_encode($tasks);
        break;

    default:
        echo json_encode(['error' => 'Invalid request method']);
}

// Close connection
$conn->close();


// // Requête SQL pour obtenir les utilisateurs
// $sql = "SELECT id, nom, date ,done FROM tasks";
// $result = $conn->query($sql);

// // Vérifier si des résultats ont été trouvés
// if ($result->num_rows > 0) {
//     // SQL query failed
//     $tasks = [];
//         while ($row = $result->fetch_assoc()) {
//             $tasks[] = $row;
//         }
//         echo json_encode($tasks);
//     } else {
//         echo json_encode([]);
//     }

// // // Get data from POST request
// $data = json_decode(file_get_contents('php://input'), true);
// $nom = $data['nom'];
// $date = $data['date'];
// $done = $data['done'];
// $done_int = $done? 1 : 0;
// $type = $data['type'];

// //create tasks
// if($type =='create'){
//     // Validate input

//     if (empty($nom) || empty($date) || empty($done)) {
//         echo "All fields are required.";
//         exit;
//     }
//     // Prepare and bind
//     $stmt = $conn->prepare("INSERT INTO tasks (nom, date, done) VALUES (?, ?, ?)");
//     $stmt->bind_param("ssi", $name, $date, $done_int);
//     // Execute the statement
//     if ($stmt->execute()) {
//         echo json_encode(['success' => 'User created successfully']);
//     } else {
//         echo json_encode(['error' => 'Error: ' . $stmt->error]);
//     }

//     // Close connections
//     $stmt->close();
//     // Fermer la connexion
// }
// $conn->close();


?>