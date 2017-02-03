(function () {
    angular
        .module('projectTracker')
        .factory('Task', _initializer);

    _initializer.$inject = ['$resource'];

    function _initializer($resource) {
        return $resource('/api/task/:id');
    }
})();