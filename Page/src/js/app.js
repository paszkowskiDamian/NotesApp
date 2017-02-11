var app = angular.module('notes',
    [
        'ngRoute',
        'ngStorage'
    ]);

app.config(function($routeProvider,$locationProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "assets/templates/home/home.html",
    controller: "homeCtrl"
  })
  .when("/note/:index", {
    templateUrl : "assets/templates/note/note.html",
    controller: "noteCtrl"
  })
  .when('/add',{
    templateUrl: "assets/templates/add/add.html",
    controller: "addCtrl"
  })
  .otherwise({
    templateUrl: "assets/templates/home/home.html",
    controller: "homeCtrl"
  })

  $locationProvider.html5Mode(true);
});

angular.module('notes').controller('addCtrl', function ($scope, notesSrvc, regExpSrvc) {
    $scope.images = [];
    $scope.number = 0;

    $scope.updata = () => {
        $scope.images = regExpSrvc.extractUrls($scope.content);
        $scope.number = $scope.images.length;
    }

    $scope.submit = () => {
        notesSrvc.createNote($scope.title, $scope.content);
    }
})
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
angular.module('notes').directive('appMenu',function(){
    return {
        restrict: 'E',
        scope: {

        },
        controller : 'menuCtrl',
        templateUrl : 'assets/templates/menu/menu.html'
    }
}) 
angular.module('notes').controller('menuCtrl',function ($scope,notesSrvc,regExpSrvc){
    
    notesSrvc.getAllNotes().then( (result)=>{
        $scope.showList = true;
        $scope.notes = result;
    },(err)=>{
        $scope.showList = false;
        $scope.notes = err;
    } );




})
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
            resolve("note added!");
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
                note.content = content;
                note.title = title;
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
angular.module('notes').service('regExpSrvc', function () {
    this.extractUrls = (content) => {
        var pattern = /https?:\/\/([a-z0-9-.\/_#\^\?=:\,%]*)\.(jpg|png|gif)\b/ig;
        var array = [];
        var url;
        while ((url = pattern.exec(content)) !== null) {
            array.push(url[0]);
        }
        return array;
    }
});

