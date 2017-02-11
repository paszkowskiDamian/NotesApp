angular.module('notes').service('regExpSrvc', function () {
    this.extractUrls = (content) => {
        var pattern = /https?:\/\/([a-z0-9-.\/_#\^\?=:]*)\.(jpg|png|gif)/ig;
        var array = [];
        var url;
        while ((url = pattern.exec(content)) !== null) {
            array.push(url[0]);
        }
        return array;
    }
});

