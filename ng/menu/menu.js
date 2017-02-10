angular.module('notes').directive('menu',()=>{
    return {
        restrict: 'E',
        scope: {

        },
        controller : 'menuCtrl',
        templateUrl : 'assets/templates/menu/menu.html'
    }
}) 