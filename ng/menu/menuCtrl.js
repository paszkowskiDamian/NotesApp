angular.module('notes').controller('menuCtrl',function ($scope,notesSrvc,regExpSrvc){
    
    notesSrvc.getAllNotes().then( (result)=>{
        $scope.showList = true;
        $scope.notes = result;
        console.log(regExpSrvc.extractUrls($scope.notes[0].content));
    },(err)=>{
        $scope.showList = false;
        $scope.notes = err;
    } );




})