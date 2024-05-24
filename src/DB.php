<?php

namespace App;

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'event_calendar');

class DB {
  private $conn;

  public function __construct() {
    $this->conn = new \mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    if ($this->conn->connect_error) {
      die("Connection failed: " . $this->conn->connect_error);
    }
  }

  public function query($sql) {
    return $this->conn->query($sql);
  }

  public function close() {
    $this->conn->close();
  }
}