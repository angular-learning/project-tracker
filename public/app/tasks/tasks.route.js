(function () {

    _config.$inject = ['$stateProvider', '$urlRouterProvider'];

    angular
        .module('projectTracker')
        .config(_config);

    function _config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/tasks/');

        $stateProvider
            .state('layout.tasks', {
                url: 'tasks/?selectedId',
                views: {
                    '': {
                        templateUrl: '/app/tasks/tasks-layout.view.tmpl.html',
                        controller: 'taskListController as taskLstCtrl',
                    },
                    'list@layout.tasks': { templateUrl: '/app/tasks/tasks-list.view.tmpl.html' }
                }
            })
            .state('details', {
                parent: 'layout.tasks',
                url: 'details/',
                templateUrl: '/app/tasks/tasks-details.view.tmpl.html',
                controller: 'taskDetailsController as taskCtrl'
            });
    }
})();