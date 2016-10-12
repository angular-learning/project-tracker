(function () {

    _init.$inject = ['toastr'];

    angular
        .module('projectTracker')
        .directive('ptTask', _init);

    function _init(toastr) {

        var controller = function () {
            var self = this;

            self.checkTask = _checkTask;
            self.deleteTask = _deleteTask;
            self.updateTaskTitle = _updateTaskTitle;

            function _checkTask() {
                self.task.done = !self.task.done;
                self.update()(self.task);
                
                if (self.task.done)
                    toastr.success('Task ' + self.task.name + ' completed!');
            }

            function _deleteTask() {
                 self.delete()(self.task);
                 toastr.error('Task ' + self.task.name + ' deleted!');
            }

            function _updateTaskTitle() { 
                _.debounce(self.update()(self.task), 300); 
            }

        };

        return {            
            restrict: 'EA',
            scope: {
                task: '=',
                update: '&',
                delete: '&'                
            },
            controller: controller,
            controllerAs: 'self',
            bindToController: true,
            templateUrl: '/app/tasks/task.tmpl.html'
        }
    }
})();