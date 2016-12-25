app.service('apiService', function ($http, $state) {
    var base = 'http://localhost:8081';
    this.getUserData = function (url, data, callback) {
        $http({
            method: 'POST',
            url:url,
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (data) {
            callback(data);
        }, function (err) {
            callback(err);
        })
    }
});