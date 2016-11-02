angular.module('poetry').config(function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/poetry');
    $stateProvider
       
        .state('poetry',{
            url:'/poetry',
            views:{ 
                'content':{
                    templateUrl:'views/poetry.html',
                    controller:'poetryCtrl'
                }
            },
            cache:false

        })
         .state('dashboard',{
            url:'/dashboard',
            views:{ 
                'content':{
                    templateUrl:'views/dashboard.html',
                    controller:'dashboardCtrl'
                }
            },
            cache:false

        })
        .state('signup',{
            url:'/signup',
            views:{ 
                'content':{
                    templateUrl:'views/signup.html',
                   // controller:'signupCtrl'
                }
            },
            cache:false

        })
         .state('login',{
            url:'/login',
            views:{
                'content':{
                    templateUrl:'views/login.html',
                    //controller:'loginCtrl'
                }
            },
            cache:false
        })
});