angular.module('poetry').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider

        .state('poetry', {
            url: '/poetry',
            views: {
                'content': {
                    templateUrl: 'views/poetry.html',
                    controller: 'poetryCtrl',

                }
            },
            cache: false

        })


        .state('dashboard', {
            resolve: {
                "check": function ($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                }
            },
            url: "/dashboard/:ID",
            views: {
                'topBar': {
                    templateUrl: "views/topBar.html",
                    //controller: 'topBarCtrl',
                },
                'sideBar': {
                    templateUrl: "views/sideBar.html",
                    controller: 'dashboardCtrl',
                    ///controller:"sideBarCtrl",

                },
                'content': {
                    templateUrl: 'views/dashboard.html',
                    controller: 'dashboardCtrl',

                }
            },
            cache: false
        })

        .state('signup', {
            url: '/signup',
            views: {
                'content': {
                    templateUrl: 'views/signup.html',
                    // controller:'signupCtrl'

                }
            },
            cache: false

        })
        .state('login', {
            url: '/login',
            views: {
                'content': {
                    templateUrl: 'views/login.html',
                    controller: 'loginCtrl',

                }
            },
            cache: false
        })
        .state('setting', {
            url: '/setting',
            views: {
                'topBar': {
                    templateUrl: "views/topBar.html",
                    //controller: 'topBarCtrl',
                },
                'sideBar': {
                    templateUrl: "views/sideBar.html",
                    controller: 'dashboardCtrl',
                    ///controller:"sideBarCtrl",

                },
                'content': {
                    templateUrl: 'views/setting.html',
                    controller: 'dashboardCtrl',

                }
            },
            cache: false
        })


    $urlRouterProvider.otherwise('/poetry');
});