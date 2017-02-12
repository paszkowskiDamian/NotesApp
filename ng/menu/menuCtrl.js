angular.module('notes').controller('menuCtrl', function ($scope, $location, notesSrvc) {

    $scope.showMenu = false;
    $scope.home = true;
    $scope.searchClass = "";

    $scope.search = ()=>{
        if($scope.searchClass === "")
        {
            $scope.searchClass = "expaned";
            $('.search-input').focus();
        }else{
            //$scope.searchClass = "";
        }
        
    }

    $scope.menu = () => {
        $scope.showMenu = !$scope.showMenu;
        $scope.searchClass = "";
        if($location.path() === '/add'){
            $scope.home = true;
        }else{
            $scope.home = false;
        }
    }

    $scope.navigateTo = () => {
        if ($location.path() === '/add') {
            $location.path('/');
            $scope.searchClass = "";
            $scope.home = false;
        } else {
            $location.path('/add');
            $scope.searchClass = "";
            $scope.home = true;
        }
    }

    notesSrvc.getAllNotes().then((result) => {
        $scope.showList = true;
        $scope.notes = result;
    }, (err) => {
        $scope.showList = false;
        $scope.notes = err;
    });

})