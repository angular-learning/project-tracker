(function () {
    angular
        .module('projectTracker')
        .factory('History', function ($resource) {
            return $resource('/api/audit/:id');
        });
})();