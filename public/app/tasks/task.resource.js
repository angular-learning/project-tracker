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
            var defer = $q.defer();
            defer.resolve(_task.delete({ id: id }));
            return defer.promise;
        }

        var _service = {
            getList: _getList,
            getSelected: _getSelectedTask,
            create: function (data) {
                if (!savePromise)
                    savePromise = _task.save(data);
                return savePromise.$promise;
            },
            update: function (index, data) {
                if (!updatePromise)
                    updatePromise = _task.save({ id: index }, data);
                return updatePromise.$promise;
            },
            delete: _deleteTask
        };

        return _service;
    }
})();