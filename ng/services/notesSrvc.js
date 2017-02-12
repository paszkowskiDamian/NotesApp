angular.module('notes').service('notesSrvc', function ($localStorage) {

    this.createNote = (title, content) => {
        var note = {
            title: title,
            date: new Date(),
            content: content
        };
        if (!vilidateIndex(0)) {
            $localStorage.notes = [];
        }
        $localStorage.notes.push(note);
        return new Promise(function (resolve, reject) {
            resolve($localStorage.notes.length-1);
        })
    }

    this.getAllNotes = function () {
        return new Promise((resolve, reject) => {
            if ($localStorage.notes !== undefined && $localStorage.notes.length > 0) {
                resolve($localStorage.notes);
            } else {
                reject('Please add some notes :)');
            }
        })
    }

    this.getNote = (index) => {
        return new Promise((resolve, reject) => {
            if (vilidateIndex(index)) {
                resolve($localStorage.notes[index]);
            } else {
                reject('No mathing note found :(');
            }
        })
    }

    this.editNote = (index, title, content) => {
        return new Promise((resolve, reject) => {
            if (vilidateIndex(index)) {
                var note = $localStorage.notes[index];
                note.content = content;
                note.title = title;
                $localStorage.notes[index] = note;
                resolve(note);
            } else {
                reject('No mathing note found :(');
            }
        })
    }

    this.deleteNote = (index) => {
        return new Promise((resolve, reject) => {
            if (vilidateIndex(index)) {
                $localStorage.notes.splice(index, 1);
                resolve('note deleted!');
            } else {
                reject('No mathing note found:( ');
            }
        })
    }

    var vilidateIndex = (index) => {
        if ($localStorage.notes !== undefined && $localStorage.notes[index] !== undefined) {
            return true;
        } else {
            return false;
        }
    }

})