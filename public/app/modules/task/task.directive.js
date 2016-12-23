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
            self.updateTaskTitle = _.debounce(_updateTaskTitle, 600); 

            function _checkTask() {
                self.task.isDone = !self.task.isDone;
                self.update()(self.task);
                
                if (self.task.isDone)
                    toastr.success('Task ' + self.task.title + ' completed!');
            }

            function _deleteTask() {
                 self.delete()(self.task);
                 toastr.error('Task ' + self.task.title + ' deleted!');
            }

            function _updateTaskTitle() { 
                self.update()(self.task);
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
            templateUrl: '/app/components/task/task.tmpl.html'
        }
    }
})();