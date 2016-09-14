(function () {
    angular
        .module('projectTracker')
        .directive('ptTaskList', _directive);

    function _directive() {
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
            templateUrl: '/app/tasks/task-list.tmpl.html'
        };
    }
})();