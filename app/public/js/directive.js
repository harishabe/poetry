app.directive("compareTo", function() {
    return {
        require: "ngModel",
        link: function(scope, element, attrs, ctrl) {
            ctrl.$validators.compareTo = function(val) {
                return val == scope.$eval(attrs.compareTo);
            };

            scope.$watch(attrs.compareTo, function() {
                ctrl.$validate();
            });
        }
    };
})

app.directive("isolatedScopeWithTransclusion",function(){
return{
     restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            tasks: '='
        },
        
        link: function (scope) {
            scope.addTask = function (){

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
});
