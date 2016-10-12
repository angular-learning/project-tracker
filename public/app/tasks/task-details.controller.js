(function () {

    _controller.$inject = ['$stateParams', 'Task', 'toastr'];

    angular
        .module('projectTracker')
        .controller('taskDetailsController', _controller);

    function _controller($stateParams, Task, toastr) {
        var self = this;

        Task.get({ id: $stateParams.selectedId }, function (data) {
            self.task = data;
        });
    }
})();