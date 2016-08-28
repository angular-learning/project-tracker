angular.module('config', [])
    .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'index.html',
            controller: 'mainController'
        });

    $urlRouterProvider.otherwise('/');
});
