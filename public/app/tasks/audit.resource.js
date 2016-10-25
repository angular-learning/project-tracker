(function () {
    angular
        .module('projectTracker')
        .factory('Audit', _resourceInitializer);

    _resourceInitializer.$inject = ['$resource'];

    function _resourceInitializer($resource) {
        return $resource('/api/audit/:id');
    }
})();