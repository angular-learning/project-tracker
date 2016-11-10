(function () {

    _controller.$inject = ['$scope', '$stateParams', 'Task', 'toastr'];

    angular
        .module('projectTracker')
        .controller('taskDetailsController', _controller);

    function _controller($scope, $stateParams, Task, toastr) {
        var self = this;
        
        $scope.GetSelectedTask.then(function (data) {
            self.task = data;
        });
    }
})();