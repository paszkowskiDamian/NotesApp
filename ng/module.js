var app = angular.module('notes',
    [
        'ngRoute',
        'LocalStorageModule'
    ]);

app.config(function($routeProvider,localStorageServiceProvider,$locationProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "assets/templates/home/home.html",
    controller: "homeCtrl"
  })
  .when("/note/:index", {
    templateUrl : "assets/templates/note/note.html",
    controller: "noteCtrl"
  })
  .otherwise({
    templateUrl: "assets/templates/home/home.html",
    controller: "homeCtrl"
  })

  localStorageServiceProvider.setPrefix('notes');

  $locationProvider.html5Mode(true);
});
