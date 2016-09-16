(function () {
    angular
        .module('projectTracker')
        .config(['$stateProvider', _config]);

    function _config(stateProvider) {
        stateProvider
            .state("tasks", {
                abstract: true,
                url: '/',
                controller: 'mainController as mainCtrl',
                views: {
                    '' : { templateUrl: '/app/tasks/tasks-main.view.tmpl.html' },
                    'header@tasks': { templateUrl: '/app/tasks/tasks-header.view.tmpl.html' },
                    'footer@tasks': { templateUrl: '/app/tasks/tasks-footer.view.tmpl.html' }
                }
            })
            .state('tasks.list', {
                url: 'list',
                controller: 'taskController as taskCtrl',
                templateUrl: '/app/tasks/tasks-list.view.tmpl.html'
            })
            .state('tasks.details', {
                url: 'details',
                templateUrl: '/app/tasks/tasks-details.view.tmpl.html'
            });
    }
})();