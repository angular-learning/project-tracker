angular
    .module('project-tracker')
    .directive('ptTodoList', function() {
        var controller = function () {

            var self = this;

            self.updateTodo = _update;
            self.deleteTodo = _delete;
            
            function _update(todo) {
                self.loading = true;
                self.update()(todo);
                self.loading = false;
            }

            function _delete(todo) {
                self.loading = true;
                self.delete()(todo);
                self.loading = false;
            }
        };
        
        return {            
            restrict: 'EA',
            scope: {
                title: '@',
                datasource: '=',
                update: '&',
                delete: '&'
            },
            controller: controller,
            controllerAs: 'self',
            bindToController: true,
            templateUrl: '././templates/todo.list.tmpl.html'
        }
    });