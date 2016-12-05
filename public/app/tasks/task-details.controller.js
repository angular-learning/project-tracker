(function () {

    _controller.$inject = ['$stateParams', 'TaskService', 'toastr'];

    angular
        .module('projectTracker')
        .controller('taskDetailsController', _controller);

    function _controller($stateParams, TaskService, toastr) {
        var self = this;
        TaskService.getSelected($stateParams.id).then(function (data) {
            self.task = data;
            self.updateTask = _.debounce(_updateTaskTitle, 200);
        });

        function _updateTaskTitle() {
            TaskService.update(self.task);
        }
    }
})();