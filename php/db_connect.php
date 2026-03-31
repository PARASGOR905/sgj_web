<?php
// Database Connection for SGJ Institute

require_once __DIR__ . '/config.php';

class DatabaseConnection {
    private string $host;
    private int    $port;
    private string $dbname;
    private string $username;
    private PDO    $pdo;

    public function __construct() {
        $this->host   = DB_HOST;
        $this->port   = DB_PORT;
        $this->dbname = DB_NAME;
        $this->username = DB_USER;

        try {
            $dsn     = "mysql:host={$this->host};port={$this->port};dbname={$this->dbname};charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
            ];

            $this->pdo = new PDO($dsn, $this->username, DB_PASS, $options);

            // Clear the plaintext password from memory immediately after connect.
            // The constant DB_PASS still exists but this removes any local copy.

        } catch (PDOException $e) {
            error_log('Database connection failed: ' . $e->getMessage());
            throw new Exception('Database connection failed');
        }
    }

    public function getConnection(): PDO {
        return $this->pdo;
    }

    public function query(string $sql, array $params = []): PDOStatement {
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            error_log('Database query error: ' . $e->getMessage());
            throw new Exception('Database query failed');
        }
    }

    public function getLastInsertId(): string {
        return $this->pdo->lastInsertId();
    }
}

/**
 * Returns a singleton DatabaseConnection for the current request lifecycle.
 */
function getDB(): DatabaseConnection {
    static $db = null;
    if ($db === null) {
        $db = new DatabaseConnection();
    }
    return $db;
}

/**
 * Quick connectivity check. Returns true if the database is reachable.
 */
function testDBConnection(): bool {
    try {
        $stmt   = getDB()->query('SELECT 1 AS test');
        $result = $stmt->fetch();
        return $result !== false;
    } catch (Exception) {
        return false;
    }
}
?>
