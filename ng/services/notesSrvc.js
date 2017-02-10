angular.module('notes').service('noteSrvc', function (localStorageServiceProvider) {

    this.createNote = function (title, content) {
        return new Promise(function (sucess, reject) {
            var note = {
                title: title,
                content: content
            };
            localStorageServiceProvider.set()
        })
    }

    this.getAllNotes = function () {
        // return new Promise(function (sucess,reject) {

        //   })
    }

    this.getNote = function (index) {

    }

})