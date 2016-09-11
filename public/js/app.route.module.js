angular.module('appRouteModule', ['ui.router'])
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
                    templateUrl: '/index.html'
                })
                .state('tasks.list', {
                    url: 'list',
                    templateUrl: '/templates/tasks.list.tmpl.html'
                })
                .state('tasks.details', {
                    url: 'details',
                    templateUrl: '/templates/tasks.details.tmpl.html'
                });

                $locationProvider.html5Mode(true);
        }
    ]);