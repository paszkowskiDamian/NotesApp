angular.module('notes').controller('noteCtrl', function ($scope, $location, $routeParams, notesSrvc, regExpSrvc) {

    $scope.edit = false;

    $scope.copy = (url) => {
        url.select();
        document.execCommand('copy');
    }

    $scope.update = () => {
        notesSrvc.editNote($routeParams.index, $scope.note.title, $scope.note.content);
        $scope.images = regExpSrvc.extractUrls($scope.note.content);
    };

    $scope.delete = () => {
        if (window.confirm("Are you Sure?")) {
            notesSrvc.deleteNote($routeParams.index);
            $location.path('/')
        }
    }

    notesSrvc.getNote($routeParams.index).then((res) => {
        $scope.note = res;
        $scope.images = regExpSrvc.extractUrls(res.content);
    }, (err) => {
        $scope.note = err;
    });

})