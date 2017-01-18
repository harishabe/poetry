app.directive("compareTo", function () {
    return {
        require: "ngModel",
        link: function (scope, element, attrs, ctrl) {
            ctrl.$validators.compareTo = function (val) {
                return val == scope.$eval(attrs.compareTo);
            };

            scope.$watch(attrs.compareTo, function () {
                ctrl.$validate();
            });
        }
    };
})

app.directive("isolatedScopeWithTransclusion", function () {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            tasks: '='
        },

        link: function (scope) {
            scope.addTask = function () {

                if (!scope.tasks) scope.tasks = [];

                scope.tasks.push({
                    title: scope.title
                });

            };
        },
        template: '<form><div><div class="form-group"><textarea class="form-control" style="height:158px;" ng-model="title" type="text"></textarea></div> &nbsp;' +
        '<button class="btn btn-success pull-right" ng-click="addTask()">Add Task</button>' +
        '<div class="taskContainer"><br />' +
        '<ng-transclude></ng-transclude>' +
        '</div></div></form>'
    };
})
app.directive('topBar', function () {
    return {
        restrict: 'E',
        template: '<nav class="navbar navbar-default">' +
        '<div class="container-fluid">' +
        '<div class="navbar-header">' +
        '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">' +
        '<span class="icon-bar"></span>' +
        '<span class="icon-bar"></span>' +
        '<span class="icon-bar"></span>' +
        '</button>' +
        '<a class="navbar-brand" ui-sref="poetry">POETRY</a>' +
        '</div>' +
        '<div class="collapse navbar-collapse" id="myNavbar">' +
        '<ul class="nav navbar-nav">' +
        '</ul>' +
        '<ul class="nav navbar-nav navbar-right">' +
        '<li><a ui-sref="signup"><i class="fa fa-user"></i> Sign Up</a></li>' +
        '<li><a ui-sref="login"><i class="fa fa-sign-in"></i> Login</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</nav>'
    }
})
app.directive('showMore', function () {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            text: '=',
            limit: '='
        },
        template: '<div><p ng-show="largeText"> {{ text | subString :0 :end }}....<a style="color:#1bbc9b" href="javascript:;" ng-click="showMore()" ng-show="isShowMore">Show More</a><a href="javascript:;" ng-click="showLess()" ng-hide="isShowMore">Show Less </a></p><p ng-hide="largeText">{{ text }}</p></div> ',
        link: function (scope, elem, attrs) {

            scope.end = scope.limit;
            scope.isShowMore = true;
            scope.largeText = true;

            if (scope.text.length <= scope.limit) {
                scope.largeText = false;
            };

            scope.showMore = function () {
                scope.end = scope.text.length;
                scope.isShowMore = false;
            };

            scope.showLess = function () {
                scope.end = scope.limit;
                scope.isShowMore = true;
            };
        }
    }
})
