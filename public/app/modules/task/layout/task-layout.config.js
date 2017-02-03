(function () {

    _config.$inject = ['$stateProvider', '$urlRouterProvider'];

    angular
        .module('projectTracker')
        .config(_config);

    function _config($stateProvider, $urlRouterProvider) {
        // $urlRouterProvider
        //     .otherwise('/tasks/');

        $stateProvider
            .state('layout.tasks', {
                url: 'tasks/',
                params: {
                    id: null
                },
                views: {
                    '': {
                        templateUrl: '/app/modules/task/layout/task-layout.view.tmpl.html'
                    },
                    'list@layout.tasks': {
                        templateUrl: '/app/modules/task/list/task-list.view.tmpl.html',
                        controller: 'taskListController as taskLstCtrl'
                    },
                    'task@layout.tasks': {
                        templateUrl: '/app/modules/task/history/task-history.view.tmpl.html',
                        controller: 'taskHistoryController as taskHstCtrl'
                    }
                }
            })
            .state('details', {
                parent: 'layout.tasks',
                url: ':id/details/',
                views: {
                    'task@layout.tasks': {
                        templateUrl: '/app/modules/task/details/task-details.view.tmpl.html',
                        controller: 'taskDetailsController as taskCtrl'
                    }
                }
            });
    }
})();