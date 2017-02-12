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

});