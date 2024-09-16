<?php
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
}
// Requête SQL pour obtenir les utilisateurs
$sql = "SELECT id, username, email, reg_date FROM users";
$result = $conn->query($sql);

// Vérifier si des résultats ont été trouvés
if ($result->num_rows > 0) {
    // Boucle à travers les résultats et afficher les utilisateurs
    while($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"]. " - Nom: " . $row["username"]. " - Email: " . $row["email"]. " - Date d'enregistrement: " . $row["reg_date"]. "<br>";
    }
} else {
    echo "0 résultats";
}

// Fermer la connexion
$conn->close();
?>

?>