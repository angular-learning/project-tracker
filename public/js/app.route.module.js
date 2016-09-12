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
                    template: '<ui-view/>'
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
            
            /**
             * /human
             *      human.template.html
             *      human.css
             *      human.directive.js
             *      human.controller.js
             *      human.controller.spec.js
             *
             */
        }
    ]);