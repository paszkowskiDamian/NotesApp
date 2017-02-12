angular.module('notes').controller('homeCtrl', function ($scope, notesSrvc, regExpSrvc) {

    ($scope.get = () => {
        notesSrvc.getAllNotes().then((result) => {
            $scope.notes = result;
            $scope.notes.map((note) => {
                note.image = regExpSrvc.extractUrls(note.content)[0];
                $scope.msg = ""
                return note;
            })
        }, (err) => {
            $scope.msg = "Add some notes! :)"
        })
    })();

    $scope.filter = (index) => {

        if($scope.indexes === undefined || $scope.indexes.includes(index))
        {
            return true;
        }else{
            return false;
        }

    }

    $scope.search = () => {
        $scope.indexes = [];
        $scope.notes.forEach( (note,index)=>{
            var title= note.title.toLowerCase();
            if(title.indexOf($scope.lookingFor) !== -1)
            {
                $scope.indexes.push(index);
            }
        });
    }

});