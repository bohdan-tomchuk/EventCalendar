<?php

namespace App;

class Router {
  protected $routes = [];

  protected function addRoute($route, $controller, $action, $method) {
    $this->routes[$method][$route] = [
      'controller' => $controller,
      'action' => $action,
    ];
  }

  public function get($route, $controller, $action) {
      $this->addRoute($route, $controller, $action, "GET");
  }

  public function post($route, $controller, $action) {
      $this->addRoute($route, $controller, $action, "POST");
  }

  public function dispatch() {
    $uri = strtok($_SERVER['REQUEST_URI'], '?');
    $method = $_SERVER['REQUEST_METHOD'];

    if (array_key_exists($uri, $this->routes[$method])) {
      $controller = $this->routes[$method][$uri]['controller'];
      $action = $this->routes[$method][$uri]['action'];

      $controller = new $controller();

      // handle also post request body
      if ($method === 'POST') {
        $body = file_get_contents('php://input');
        $parsedBody = json_decode($body, true);
        call_user_func([$controller, $action], $parsedBody);
      } else {
        parse_str(parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $params);
        call_user_func_array([$controller, $action], $params);
      }
    } else {
      throw new \Exception("No route found for URI: $uri");
    }
  }
}
