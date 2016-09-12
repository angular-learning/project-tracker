angular
    .module('projectTracker', ['ui.router'])
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
                .when('details', '/details')
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
                    controller: 'tasksController as tasksCtrl',
                    templateUrl: '/tasks/tasks.list.tmpl.html'
                })
                .state('tasks.details', {
                    url: 'details',
                    templateUrl: '/tasks/tasks.details.tmpl.html'
                });

            $locationProvider.html5Mode(true);
        }
    ]);