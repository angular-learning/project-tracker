(function () {

    _controller.$inject = ['Task', 'toastr', '$state', '$stateParams'];

    angular
        .module('projectTracker')
        .controller('taskListController', _controller);

    function _controller(Task, toastr, $state, $stateParams) {
        var self = this;

        self.newTask = {};
        self.initializing = true;
        self.selectedId = $stateParams.selectedId;

        Task.query(function (data) {
            self.tasks = data;
            self.initializing = false;
        });

        self.createTask = _createTask;
        self.updateTask = _updateTask;
        self.deleteTask = _deleteTask;
        self.selectTask = _selectTask;

        function _createTask() {
            if (!self.newTask.name)
                return;

            self.loading = true;

            return Task.save(self.newTask, function (data) {
                self.tasks.push(data);
                toastr.info('Task ' + self.newTask.name + ' created!');
                self.newTask = {};
            }).$promise.finally(function () {
                self.loading = false;
            });
        }

        function _updateTask(task) {

            self.loading = true;

            return Task.save({ id: task.id }, task).$promise.finally(function () {
                self.loading = false;
            });
        }

        function _deleteTask(task) {
            self.loading = true;

            Task.delete({ id: task.id }, function (data) {
                _.remove(self.tasks, { id: task.id });
            }).$promise.finally(function () {
                self.loading = false;
            });
        }

        function _selectTask(task) {
            if (task) {
                self.selectedId = task.id;
                $state.go('details', {selectedId: task.id});
            }
            else {
                self.selectedId = undefined;
                $state.go('layout.tasks');
            }
        }
    }
})();