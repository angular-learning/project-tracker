(function () {

    _controller.$inject = ['GetSelectedTask', '$stateParams', 'Task', 'toastr'];

    angular
        .module('projectTracker')
        .controller('taskDetailsController', _controller);

    function _controller(GetSelectedTask, $stateParams, Task, toastr) {
        var self = this;
        self.task = GetSelectedTask.data;        
    }
})();