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
                url: 'tasks/',
                params: {
                    id: null
                },
                views: {
                    '': {
                        templateUrl: '/app/components/task/tasks-layout.view.tmpl.html'
                    },
                    'list@layout.tasks': {
                        templateUrl: '/app/components/task/list/tasks-list.view.tmpl.html',
                        controller: 'taskListController as taskLstCtrl'
                    },
                    'task@layout.tasks': {
                        templateUrl: '/app/components/task/audit/tasks-audit.view.tmpl.html',
                        controller: 'taskAuditController as taskAdtCtrl'
                    }
                }
            })
            .state('details', {
                parent: 'layout.tasks',
                url: ':id/details/',
                views: {
                    'task@layout.tasks': {
                        templateUrl: '/app/components/task/details/task-details.view.tmpl.html',
                        controller: 'taskDetailsController as taskCtrl'
                    }
                }
            });
    }
})();