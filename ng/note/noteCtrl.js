angular.module('notes').controller('noteCtrl',function ($scope,$routeParams,notesSrvc,regExpSrvc){

    notesSrvc.getNote($routeParams.index).then((res)=>{
        $scope.note = res;
        $scope.images = regExpSrvc.extractUrls(res.content);
    },(err)=>{
        $scope.note = err;
    });
    
})