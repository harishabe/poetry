var app = angular.module('poetry');
app.controller('poetryCtrl',
    ['$scope', '$state', '$http', 'AuthService', 'apiService', '$location', '$anchorScroll',
        function ($scope, $state, $http, AuthService, apiService, $location, $anchorScroll) {
            $scope.lDatas = '';
            $scope.gotoBottom = function (scrollLocation) {
                $location.hash(scrollLocation);
                $anchorScroll();
            };

            $scope.showData123 = function () {
                apiService.getStoryData('/users/api/getStory', function (response) {
                    $scope.usersDetails = response.data;
                    $scope.lDatas = response.data;
                })
            }

            $scope.limit = 3;
            $scope.loadMore = function () {
                $scope.increment = $scope.limit + 3;
                $scope.limit = $scope.increment > $scope.lDatas.length ? $scope.lDatas.length : $scope.increment;
                console.log('Here is an limit:' + $scope.limit);
            }

            //Get authorList
            $scope.getAuthorList = function () {
                var id = localStorage.id;
                apiService.getUsers('/users/api/getUsers', function (response) {
                    $scope.user = response.data;
                });
            }
            $scope.goTop = function () {
                $location.hash('top')
            }
        }])
app.controller('regCtrl',
    ['$scope', '$state', 'AuthService', 'toaster',
        function ($scope, $state, AuthService, toaster) {
            $scope.register = function () {
                $scope.error = false;
                $scope.disabled = true;
                AuthService.register($scope.registerForm.username, $scope.registerForm.fname, $scope.registerForm.lname, $scope.registerForm.email, $scope.registerForm.phnum, $scope.registerForm.pwd)
                    // handle success
                    .then(function () {
                        toaster.pop('success', "Hi," + $scope.registerForm.fname + " ", "Successfully Registered");
                        $state.go('login');
                        $scope.disabled = false;
                        $scope.registerForm = " ";
                    })
                    // handle error
                    .catch(function () {
                        $scope.error = true;
                        toaster.pop('error', "Username Already exists", null, 'trustedHtml');
                        $scope.errorMessage = "Something went wrong!";
                        $scope.disabled = false;
                    });
            };
        }])
app.controller('loginCtrl',
    ['$scope', '$rootScope', '$http', '$state', 'AuthService', 'toaster',
        function ($scope, $rootScope, $http, $state, AuthService, toaster) {
            $scope.Userlogin = function () {
                // initial values
                $scope.error = false;
                $scope.disabled = true;
                // call login from service
                AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                    // handle success
                    .then(function (response) {
                        localStorage.setItem("id", response.data.data._id);
                        toaster.pop('success', "Welcome To Poetry");
                        $rootScope.loggedIn = true;
                        $state.go('dashboard', { ID: response.data.data._id });
                        $scope.disabled = false;
                        $scope.loginForm = {};
                    })
                    // handle error
                    .catch(function () {
                        $scope.error = true;
                        toaster.pop('error', '', "Invalid username and password", null, 'trustedHtml');
                        $scope.disabled = false;
                        $scope.loginForm = {};
                    });
            };
        }])
app.controller('dashboardCtrl',
    ['$scope', '$state', '$http', 'toaster', 'AuthService', 'apiService',
        function ($scope, $state, $http, toaster, AuthService, apiService) {
            $scope.story = {};
            $scope.c = '';
            $scope.chat = function () {
                $scope.c = true;
            }

            $scope.close = function () {
                $scope.c = false;
            }

            $scope.sendMsg = function (msg) {
                $scope.m = msg;
                //console.log(msg);
            }

            $scope.logOut = function () {
                $state.go('poetry');
            }

            $scope.changeText = function () {
                $scope.story.id = localStorage.id;
                if (!$scope.story.text && !$scope.story.title) {
                    toaster.pop('error', '', "Please fill the fileds", null, 'trustedHtml');
                } else {
                    apiService.getUserData('/users/api/story', $scope.story, function (response) {
                        $scope.story = '';
                        $scope.showData();
                        console.log(response);
                    })
                }
            }

            $scope.showData = function () {
                var id = localStorage.id;
                $scope.sData = [];
                apiService.getStoryData('/users/api/getStory', function (response) {
                    $scope.usersDetails = response.data;
                })
            }

            $scope.deteleStory = function (id) {
                apiService.DeleteStory('/users/api/deleteStory', id, function (response) {
                    $scope.showData();
                })
            }

            $scope.getUsers = function () {
                apiService.getUsers('/users/api/getUsers', function (response) {
                    $scope.user = response.data;
                });
            }

            $scope.getUserById=function(){
                var id=localStorage.id;
                apiService.getUserById('/users/api/getUserByID',id,function(response){
                    $scope.userById=response.data;
                    console.log($scope.userById);
                });
            }

            $scope.goSetting = function () {
                $state.go('setting');
            }

            $scope.goDashboard = function () {
                $state.go('dashboard');
            }

        }])

app.filter('subString', function () {
    return function (str, start, end) {
        console.log(start, end);
        if (str != undefined) {
            return str.substr(start, end);
        }
    }
})