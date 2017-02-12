var app = angular.module('notes',
    [
        'ngRoute',
        'ngStorage',
        'ngAnimate'
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

angular.module('notes').controller('addCtrl', function ($scope, $location, notesSrvc, regExpSrvc) {
    $scope.images = [];
    $scope.numberOfImages = 0;
    $scope.charMax = 30;
    $scope.charLeft = $scope.charMax;

    $scope.update = () => {

        $scope.images = regExpSrvc.extractUrls($scope.content);
        $scope.numberOfImages = $scope.images.length;

    }

    $scope.submit = () => {
        if ($scope.title.length > 0 && $scope.content.length > 0) {
            notesSrvc.createNote($scope.title, $scope.content).then((res) => {

                $location.path('/note/' + res);

            }, (err) => {
                //on submit error 
            });
        }
    }
})
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
angular.module('notes').directive('appMenu',function(){
    return {
        restrict: 'E',
        scope: {

        },
        controller : 'menuCtrl',
        templateUrl : 'assets/templates/menu/menu.html'
    }
}) 
angular.module('notes').controller('menuCtrl', function ($scope, $location, notesSrvc) {

    $scope.showMenu = false;
    $scope.home = true;
    $scope.searchClass = "";

    $scope.search = ()=>{
        if($scope.searchClass === "")
        {
            $scope.searchClass = "expaned";
            $('.search-input').focus();
        }else{
            //$scope.searchClass = "";
        }
        
    }

    $scope.menu = () => {
        $scope.showMenu = !$scope.showMenu;
        $scope.searchClass = "";
        if($location.path() === '/add'){
            $scope.home = true;
        }else{
            $scope.home = false;
        }
    }

    $scope.navigateTo = () => {
        if ($location.path() === '/add') {
            $location.path('/');
            $scope.searchClass = "";
            $scope.home = false;
        } else {
            $location.path('/add');
            $scope.searchClass = "";
            $scope.home = true;
        }
    }

    notesSrvc.getAllNotes().then((result) => {
        $scope.showList = true;
        $scope.notes = result;
    }, (err) => {
        $scope.showList = false;
        $scope.notes = err;
    });

})
angular.module('notes').controller('noteCtrl', function ($scope, $location, $routeParams, notesSrvc, regExpSrvc) {

    $scope.edit = false;

    $scope.update = () => {
        notesSrvc.editNote($routeParams.index, $scope.note.title, $scope.note.content);
        $scope.images = regExpSrvc.extractUrls($scope.note.content);
    };

    $scope.delete = () => {
        if (window.confirm("Are you Sure?")) {
            notesSrvc.deleteNote($routeParams.index);
            $location.path('/')
        }
    }

    notesSrvc.getNote($routeParams.index).then((res) => {
        $scope.note = res;
        $scope.images = regExpSrvc.extractUrls(res.content);
    }, (err) => {
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
angular.module('notes').service('regExpSrvc', function () {
    this.extractUrls = (content) => {
        var pattern = /https?:\/\/([a-z0-9-.\/_#\^\?=:\,%@]*)\.(jpg|png|gif|jpeg)\b/ig;
        var array = [];
        var url;
        while ((url = pattern.exec(content)) !== null) {
            array.push(url[0]);
        }
        return array;
    }
});

