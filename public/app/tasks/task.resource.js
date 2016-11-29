(function () {
    angular
        .module('projectTracker')
        .factory('Task', _initializer);

    _initializer.$inject = ['$resource', 'toastr', '$q'];

    function _initializer($resource, toastr, $q) {
        var self = this;
        var _task = $resource('/api/task/:id');

        var getListPromise;
        var getSelectedPromise;
        var savePromise;
        var updatePromise;
        var deletePromise;

        function _getList() {
            var defer = $q.defer();

            if (!self._tasks) {
                _task.query(function (data) {
                    self._tasks = data;
                }).$promise.then(function (data) {
                    defer.resolve(self._tasks);
                });
            }
            else defer.resolve(self._tasks);
            getListPromise = defer.promise;

            return getListPromise;
        }

        function _getSelectedTask(index) {
            var defer = $q.defer();

            getListPromise.then(function () {
                defer.resolve(_initSelectedTaskWithId(index));
            });
            return defer.promise;
        }

        function _initSelectedTaskWithId(id) {
            self.task = _.find(self._tasks, { id: id });
            return self.task;
        }

        function _deleteTask(id) {
            return _deferRequest(_task.delete({ id: id }));
        }

        function _updateTask(data) {
            return _deferRequest(_task.save({ id: data.id }, data));
        }

        function _createTask(data) {
            return _deferRequest(_task.save(data));
        }

        function _deferRequest(action)
        { 
            var defer = $q.defer();
            defer.resolve(action);
            return defer.promise;
        }

        var _service = {
            getList: _getList,
            getSelected: _getSelectedTask,
            delete: _deleteTask,
            create: _createTask,
            update: _updateTask
        };

        return _service;
    }
})();