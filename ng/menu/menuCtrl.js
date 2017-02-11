angular.module('notes').controller('menuCtrl',function ($scope,notesSrvc,regExpSrvc){
    
    notesSrvc.getAllNotes().then( (result)=>{
        $scope.showList = true;
        $scope.notes = result;
    },(err)=>{
        $scope.showList = false;
        $scope.notes = err;
    } );




})