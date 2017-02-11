angular.module('notes').controller('noteCtrl',function ($scope,$routeParams,notesSrvc,regExpSrvc){

    $scope.edit = false;
    
    $scope.update = () =>{
        notesSrvc.editNote($routeParams.index,$scope.note.content,$scope.note.title);
        $scope.edit = false;
    }

    notesSrvc.getNote($routeParams.index).then((res)=>{
        $scope.note = res;
        $scope.images = regExpSrvc.extractUrls(res.content);
    },(err)=>{
        $scope.note = err;
    });
    
})