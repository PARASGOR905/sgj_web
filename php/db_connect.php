<?php
// Database Connection for SGJ Institute
// Handles database connectivity with error handling

// Load configuration
require_once __DIR__ . '/config.php';

class DatabaseConnection {
    private $host;
    private $dbname;
    private $username;
    private $password;
    private $pdo;
    
    public function __construct() {
        // Use configuration constants
        $this->host = DB_HOST;
        $this->dbname = DB_NAME;
        $this->username = DB_USER;
        $this->password = DB_PASS;
    
    public function __construct() {
        try {
            $dsn = "mysql:host={$this->host};dbname={$this->dbname};charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
            ];
            
            $this->pdo = new PDO($dsn, $this->username, $this->password, $options);
            
        } catch (PDOException $e) {
            error_log('Database connection failed: ' . $e->getMessage());
            throw new Exception('Database connection failed');
        }
    }
    
    public function getConnection() {
        return $this->pdo;
    }
    
    public function query($sql, $params = []) {
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            error_log('Database query error: ' . $e->getMessage());
            throw new Exception('Database query failed');
        }
    }
    
    public function getLastInsertId() {
        return $this->pdo->lastInsertId();
    }
}

// Function to get database connection
function getDB() {
    static $db = null;
    if ($db === null) {
        $db = new DatabaseConnection();
    }
    return $db;
}

// Test database connection
function testDBConnection() {
    try {
        $db = getDB();
        $stmt = $db->query('SELECT 1 as test');
        $result = $stmt->fetch();
        return $result !== false;
    } catch (Exception $e) {
        return false;
    }
}
?>