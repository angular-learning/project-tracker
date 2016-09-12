angular
    .module('projectTracker')
    .directive('ptTasksList', function() {
        var controller = function () {

            var self = this;

            self.updateTask = _update;
            self.deleteTask = _delete;
            
            function _update(task) {
                self.update()(task);
            }

            function _delete(task) {
                self.delete()(task);
            }
        };
        
        return {
            restrict: 'EA',
            scope: {
                title: '@',
                datasource: '=',
                initializing: '=',
                loading: '=',
                update: '&',
                delete: '&'
            },
            controller: controller,
            controllerAs: 'self',
            bindToController: true,
            templateUrl: '/tasks/tasks-list.directive.tmpl.html'
        };
    });