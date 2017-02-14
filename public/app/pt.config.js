(function () {

    _run.$inject = ['$rootScope', '$state', '$stateParams', 'AuthService'];
    _config.$inject = ['$locationProvider', '$state', '$stateProvider', 'AuthService'];

    angular
        .module('projectTracker')
        .run(_run)
        .config(_config);

    function _run($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

    function _config($locationProvider, $stateProvider, $state, AuthService) {
        $stateProvider
            .state("layout", {
                abstract: true,
                url: '/?search',
                resolve: {
                    resolvedUser: _checkForAuthenticatedUser
                },
                views: {
                    '': { templateUrl: '/app/layout/layout.view.tmpl.html' },
                    'header@layout': {
                        templateUrl: '/app/layout/header.view.tmpl.html',
                        controller: 'headerController as headerCtrl'
                    },
                    'footer@layout': {
                        templateUrl: '/app/layout/footer.view.tmpl.html'
                    }
                },
            });

        $locationProvider.html5Mode(true);
    }

    function _checkForAuthenticatedUser(AuthService, $state) {
        AuthService.getUserStatus().then(function () {
            if (!AuthService.isLoggedIn()) {
                $state.go('login');
            }
        });
    }
})();