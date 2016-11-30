(function () {

    _controller.$inject = ['$stateParams', 'TaskService', 'toastr'];

    angular
        .module('projectTracker')
        .controller('taskDetailsController', _controller);

    function _controller($stateParams, TaskService, toastr) {
        var self = this;
        TaskService.getSelected($stateParams.id).then(function (data) { 
            self.task = data;
        });        
    }
})();