(function () {
    angular
        .module('projectTracker')
        .factory('TaskService', _initializer);

    _initializer.$inject = ['Task', 'toastr', '$q'];

    function _initializer(Task, toastr, $q) {
        var self = this;

        var service = {
            getList: _getList,
            getSelected: _getSelectedTask,
            delete: _deleteTask,
            create: _createTask,
            update: _updateTask
        };

        var getListPromise;
        var selectedTask;
        var taskList;

        function _getList() {
            var defer = $q.defer();

            Task.query(function (data) {
                self.taskList = data;
            }).$promise.then(function (data) {
                defer.resolve(self.taskList);
            });
            getListPromise = defer.promise;
            return getListPromise;
        }

        function _getSelectedTask(id) {
            var defer = $q.defer();

            getListPromise.then(function () {
                defer.resolve(_initSelectedTaskWithId(id));
            });

            return defer.promise;
        }

        function _initSelectedTaskWithId(id) {
            self.selectedTask = _.find(self.taskList, { id: id });
            return self.selectedTask;
        }

        function _deleteTask(id) {
            return Task.delete({ id: id }).$promise;
        }

        function _updateTask(task) {
            return Task.save({ id: task.id }, task).$promise;
        }

        function _createTask(task) {
            return Task.save(task).$promise;
        }

        return service;
    }
})();