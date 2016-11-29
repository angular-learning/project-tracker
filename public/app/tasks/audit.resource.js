(function () {
    angular
        .module('projectTracker')
        .factory('Audit', function ($resource) {
            return $resource('/api/audit/:id');
        });
})();