angular
    .module('project-tracker')
    .directive('ptTodoList', function() {
        var controller = function () {

            var self = this;

            self.updateTodo = _update;
            self.deleteTodo = _delete;
            
            function _update(todo) {
                self.update()(todo);
            }

            function _delete(todo) {
                self.delete()(todo);
            }
        };
        
        return {            
            restrict: 'EA',
            scope: {
                title: '@',
                datasource: '=',
                loading: '=',
                update: '&',
                delete: '&'                
            },
            controller: controller,
            controllerAs: 'self',
            bindToController: true,
            templateUrl: '././templates/todo.list.tmpl.html'
        }
    });