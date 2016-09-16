(function () {
    angular
        .module('projectTracker')
        .run(['$rootScope', '$state', '$stateParams', _run])
        .config(['$urlRouterProvider', '$locationProvider', _config]);

    function _run(rootScope, state, stateParams) {
        rootScope.$state = state;
        rootScope.$stateParams = stateParams;
    }

    function _config(urlRouterProvider, locationProvider) {
        urlRouterProvider
            .otherwise('/list');

        locationProvider.html5Mode(true);
    }
})();