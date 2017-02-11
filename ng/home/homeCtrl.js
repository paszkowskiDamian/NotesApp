angular.module('notes').controller('homeCtrl', function ($scope, notesSrvc, regExpSrvc) {

    $scope.add = () => {
        notesSrvc.createNote('new note', 'some http://ichef-1.bbci.co.uk/news/ws/660/amz/worldservice/live/assets/images/2015/12/31/151231172853_lions_grooming_512x288_sciencephoyolibrary_nocredit.jpg content https://www.cleverfiles.com/howto/wp-content/uploads/2016/08/mini.jpg');
    }

    ($scope.get = () => {
        notesSrvc.getAllNotes().then((result) => {
            $scope.notes = result;
            $scope.notes.map((note)=>{
                note.image = regExpSrvc.extractUrls(note.content)[0];
                return note;
            })
        }, (err) => {
            console.log(err);
        })
    })();

    $scope.getNote = (index) => {
        notesSrvc.getNote(index).then((result) => {
            console.log(result);
        }, (err) => {
            console.log(err);
        })
    }

    $scope.delete = (index) => {
        notesSrvc.deleteNote(index).then((result) => {
            console.log(result);
        }, (err) => {
            console.log(err);
        })
    }


    


});