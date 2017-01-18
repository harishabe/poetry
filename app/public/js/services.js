app.service('apiService', function ($http, $state) {
    var base = 'http://localhost:8081';
    this.getId = function (url, callback) {
        $http({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (data) {
            callback(data);
        }, function (err) {
            callback(err);
        })
    }
    this.getUsers = function (url, callback) {
        $http({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (data) {
            callback(data);
        }, function (err) {
            callback(err);
        })
    }
    this.getUserById = function (url, id, callback) {
        $http({
            method: 'GET',
            url: url + "/" + id,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (data) {
            callback(data);
        }, function (err) {
            callback(err);
        })
    }
    this.getUserData = function (url, data, callback) {
        $http({
            method: 'POST',
            url: url,
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

    this.getStoryData = function (url, callback) {
        $http({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (data) {
            callback(data);
        }, function (err) {
            callback(err);
        })
    }

    this.DeleteStory = function (url, id, callback) {
        $http({
            method: 'DELETE',
            url: url + "/" + id,
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