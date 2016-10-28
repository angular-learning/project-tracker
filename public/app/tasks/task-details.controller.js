(function () {

    _controller.$inject = ['$stateParams', 'Task', 'toastr'];

    angular
        .module('projectTracker')
        .controller('taskDetailsController', _controller);

    function _controller($stateParams, Task, SelectedTask, toastr) {
        var self = this;
        
        SelectedTask.then(function (data) {
            self.task = data;
        });
    }
})();