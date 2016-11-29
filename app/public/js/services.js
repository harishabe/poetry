app.service('apiService',function($http,$state){
this.getUserData=function(url,data,callback){
 $http({
            method: 'GET',
            url: url,
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(data) {
            callback(data);
        }, function(err) {
            callback(err);
        })
}
});