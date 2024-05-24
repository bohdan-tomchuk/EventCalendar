<?php

use App\Controllers\HomeController;
use App\Controllers\EventController;
use App\Router;

$router = new Router();

$router->get('/', HomeController::class, 'index');
$router->get('/api/events', EventController::class, 'getEvents');
$router->post('/api/events', EventController::class, 'createEvent');

$router->dispatch();
