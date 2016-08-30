angular
    .module('project-tracker')
    .directive('ptTodoList', function() {
                return { 
                    scope: true,
                    replace: true,
                    templateUrl: '././templates/todo.list.tmpl.html'
                };
    });