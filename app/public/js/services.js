app.factory('AuthService',['$q', '$timeout', '$http',function($q, $timeout, $http) {
    
    var user = null;

    return ({
      // isLoggedIn: isLoggedIn,
      // getUserStatus: getUserStatus,
      // login: login,
      // logout: logout,
      register: register
    });

    function isLoggedIn() {
      if(user) {
        return true;
      } else {
        return false;
      }
    }

     function register(username,email,phnum,fname,lname, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/users/register',
        {username:username,email:email,phnum:phnum,fname:fname,lname:lname,password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }


}]);