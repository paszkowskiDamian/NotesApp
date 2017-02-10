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

angular.module('notes').controller('homeCtrl',function ($scope){
    $scope.hello = "hello";
})
angular.module('notes').directive('menu',()=>{
    return {
        restrict: 'E',
        scope: {

        },
        controller : 'menuCtrl',
        templateUrl : 'assets/templates/menu/menu.html'
    }
}) 
angular.module('notes').controller('menuCtrl',function ($scope){
    $scope.hello = 'hello';
})
angular.module('notes').controller('noteCtrl',function ($scope,$routeParams){
    $scope.params = $routeParams;
})
angular.module('notes').service('noteSrvc', function (localStorageServiceProvider) {

    this.createNote = function (title, content) {
        return new Promise(function (sucess, reject) {
            var note = {
                title: title,
                content: content
            };
            localStorageServiceProvider.set()
        })
    }

    this.getAllNotes = function () {
        // return new Promise(function (sucess,reject) {

        //   })
    }

    this.getNote = function (index) {

    }

})