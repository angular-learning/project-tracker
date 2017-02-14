(function () {

    _run.$inject = ['$rootScope', '$stateParams'];
    _config.$inject = ['$locationProvider', '$stateProvider'];

    angular
        .module('projectTracker')
        .run(_run)
        .config(_config);

    function _run($rootScope, $stateProvider, $stateParams) {
        $rootScope.$state = $stateProvider.state;
        $rootScope.$stateParams = $stateParams;
    }

    function _config($locationProvider, $stateProvider) {
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