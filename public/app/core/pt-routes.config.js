angular
    .module('projectTracker')
    .run(
    ['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

            $urlRouterProvider
                .otherwise('/list');

            $stateProvider
                .state("tasks", {
                    abstract: true,
                    url: '/',
                    controller: 'mainController as mainCtrl',
                    template: '<div ui-view>'
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

            $locationProvider.html5Mode(true);
        }
    ]);