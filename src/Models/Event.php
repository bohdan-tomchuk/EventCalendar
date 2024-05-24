<?php

namespace App\Models;

use App\DB;

class Event {
  private $db;

  public function __construct() {
    $this->db = new DB();
  }

  public function getAllEvents($type = null) {
    $sql = null;

    if ($type) {
      $sql = "SELECT * FROM events WHERE event_type = '$type'";
    } else {
      $sql = "SELECT * FROM events";
    }

    $result = $this->db->query($sql);

    if ($result->num_rows > 0) {
      $events = [];
      while ($row = $result->fetch_assoc()) {
        $events[] = $row;
      }
      return $events;
    } else {
      return [];
    }

    $this->db->close();
  }

  public function getEventsByType($type) {
    $sql = "SELECT * FROM events WHERE event_type = '$type'";
    $result = $this->db->query($sql);

    if ($result->num_rows > 0) {
      $events = [];
      while ($row = $result->fetch_assoc()) {
        $events[] = $row;
      }
      return $events;
    } else {
      return [];
    }

    $this->db->close();
  }

  public function createEvent($data) {
    $sql = "INSERT INTO events (name, datetime, description, location, event_type) VALUES ('{$data['name']}', '{$data['datetime']}', '{$data['description']}', '{$data['location']}', '{$data['event_type']}')";
    $this->db->query($sql);
  }
}