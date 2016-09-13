angular
    .module('projectTracker')
    .factory('Task', function ($resource) {
        return $resource('/api/task/:id');
    });