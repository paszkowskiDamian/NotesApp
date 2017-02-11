angular.module('notes').directive('appMenu',function(){
    return {
        restrict: 'E',
        scope: {

        },
        controller : 'menuCtrl',
        templateUrl : 'assets/templates/menu/menu.html'
    }
}) 