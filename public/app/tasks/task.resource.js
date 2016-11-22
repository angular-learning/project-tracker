(function () {
    angular
        .module('projectTracker')
        .factory('Task', _initializer);

    _initializer.$inject = ['$resource', 'toastr', '$q'];

    function _initializer($resource, toastr, $q) {
        var _task = $resource('/api/task/:id');

        var getListPromise;
        var getSelectedPromise;
        var savePromise;
        var updatePromise;
        var deletePromise;

        var _service = {
            getList: function () {
                if (!getListPromise) {
                    getListPromise = _task.query(function (data) {
                        this._tasks = data;
                    }).$promise.then(function (data) {
                        return {
                            tasks: this._tasks
                        };
                    });
                }
                return getListPromise;
            },
            getSelected: function (index) {                
                getSelectedPromise = _task.query(function (data) {
                        this._tasks = data;
                    }).$promise.then(function (data) {
                        return {
                            task: _.find(this._tasks, { id: index })
                        };
                    });
                
                return getSelectedPromise;
            },
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
            delete: function (index) {
                if (!deletePromise)
                    deletePromise = _task.delete({ id: index });
                return deletePromise.$promise;
            }
        };

        return _service;
    }
})();