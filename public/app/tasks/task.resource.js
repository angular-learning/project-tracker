(function () {
    angular
        .module('projectTracker')
        .factory('Task', _initializer);

    _initializer.$inject = ['$resource', 'toastr'];

    function _initializer($resource, toastr) {
        var _task = $resource('/api/task/:id');
        var getListPromise;
        var savePromise;
        var updatePromise;
        var deletePromise;

        var _service = {            
            getList: function () {
                if (!getListPromise) 
                    getListPromise = _task.query();
                return getListPromise.$promise;
            },            
            create: function (data) { 
                if (!savePromise) 
                    savePromise = _task.save(data);                
                return savePromise.$promise;
            },
            update: function (index, data) { 
                if (!updatePromise) 
                    updatePromise = _task.save({id: index}, data);                
                return updatePromise.$promise;
            },
            delete: function (index) { 
                if (!deletePromise) 
                    deletePromise = _task.delete({id: index});                
                return deletePromise.$promise;
            }
        };
        
        return _service;
    }
})();