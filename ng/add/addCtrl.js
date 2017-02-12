angular.module('notes').controller('addCtrl', function ($scope, $location, notesSrvc, regExpSrvc) {
    $scope.images = [];
    $scope.numberOfImages = 0;
    $scope.charMax = 30;
    $scope.charLeft = $scope.charMax;

    $scope.update = () => {

        $scope.images = regExpSrvc.extractUrls($scope.content);
        $scope.numberOfImages = $scope.images.length;

    }

    $scope.submit = () => {
        if ($scope.title.length > 0 && $scope.content.length > 0) {
            notesSrvc.createNote($scope.title, $scope.content).then((res) => {

                $location.path('/note/' + res);

            }, (err) => {
                //on submit error 
            });
        }
    }
})