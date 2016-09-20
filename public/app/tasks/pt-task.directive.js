(function () {

    angular
        .module('projectTracker')
        .directive('ptTask', _init);

    function _init() {

        var controller = function () {
            var self = this;

            self.check = _check;
            // self.delete = _delete;

            function _check() {
                self.task.done = !self.task.done;
                self.update()(self.task);
            }

            // function _delete() {
            //     self.delete()(task);
            // }
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
            templateUrl: '/app/tasks/pt-task.tmpl.html'
        }
    }
})();