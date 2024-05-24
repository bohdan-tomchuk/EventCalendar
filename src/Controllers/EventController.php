<?php

namespace App\Controllers;

use App\Controller;
use App\Models\Event;

class EventController extends Controller {

  public function getEvents($type = null) {
    $eventModel = new Event();
    $events = $eventModel->getAllEvents($type);
    $this->response($events);
  }

  public function createEvent($data) {
    $eventModel = new Event();
    $event = $eventModel->createEvent($data);
    $this->response($event);
  }
}