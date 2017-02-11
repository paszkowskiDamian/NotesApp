angular.module('notes').controller('addCtrl', function ($scope, notesSrvc, regExpSrvc) {
    $scope.images = [];
    $scope.number = 0;

    $scope.updata = () => {
        $scope.images = regExpSrvc.extractUrls($scope.content);
        $scope.number = $scope.images.length;
    }

    $scope.submit = () => {
        notesSrvc.createNote($scope.title, $scope.content);
    }
})