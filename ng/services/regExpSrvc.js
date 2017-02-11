angular.module('notes').service('regExpSrvc', function ($localStorage) {
    this.extractUrls = (content)=>{
        var pattern = new RegExp("^https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:jpg|gif|png)$");
        return pattern.exec(content);
    }
});

