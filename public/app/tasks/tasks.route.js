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
                    id: null,
                    selectedTask : null
                },
                resolve: {
                    SelectedTask: function (Task, $route)
                    { 
                        return Task.get({ id: $route.current.params.id }, function (data) {
                            $route.current.params.selectedTask = data;
                        }).$promise;
                    }    
                },
                views: {
                    '': {
                        templateUrl: '/app/tasks/tasks-layout.view.tmpl.html'
                    },
                    'list@layout.tasks': { templateUrl: '/app/tasks/tasks-list.view.tmpl.html',
                        controller: 'taskListController as taskLstCtrl' },
                    'task@layout.tasks': { templateUrl: '/app/tasks/tasks-audit.view.tmpl.html',
                        controller: 'taskAuditController as taskAdtCtrl' }
                }
            })
            .state('details', {
                parent: 'layout.tasks',
                url: ':id/details/',
                views: {
                    'task@layout.tasks': {
                        templateUrl: '/app/tasks/tasks-details.view.tmpl.html',
                        controller: 'taskDetailsController as taskCtrl'
                }}
            });
    }
})();