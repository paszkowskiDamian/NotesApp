var app = angular.module('notes',
    [
        'ngRoute',
        'ngStorage'
    ]);

app.config(function($routeProvider,$locationProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "assets/templates/home/home.html",
    controller: "homeCtrl"
  })
  .when("/note/:index", {
    templateUrl : "assets/templates/note/note.html",
    controller: "noteCtrl"
  })
  .when('/add',{
    template: "Creator",
  })
  .otherwise({
    templateUrl: "assets/templates/home/home.html",
    controller: "homeCtrl"
  })

  $locationProvider.html5Mode(true);
});
