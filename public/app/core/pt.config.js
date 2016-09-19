(function () {
    
    _run.$inject = ['$rootScope', '$state', '$stateParams'];
    _config.$inject = ['$urlRouterProvider', '$locationProvider'];
    
    angular
        .module('projectTracker')
        .run(_run)
        .config(_config);

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