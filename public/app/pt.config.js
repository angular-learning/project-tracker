(function () {
    
    _run.$inject = ['$rootScope', '$state', '$stateParams'];
    _config.$inject = ['$locationProvider', '$stateProvider'];

    angular
        .module('projectTracker')
        .run(_run)
        .config(_config);

    function _run($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    function _config($locationProvider, $stateProvider) {
        $stateProvider
            .state("layout", {
                abstract: true,
                url: '/',
                controller: 'layoutController as layoutCtrl',
                views: {
                    '': { templateUrl: '/app/layout.view.tmpl.html' },
                    'header@layout': { templateUrl: '/app/header.view.tmpl.html' },
                    'footer@layout': { templateUrl: '/app/footer.view.tmpl.html' }
                }
            });

        $locationProvider.html5Mode(true);
    }
})();