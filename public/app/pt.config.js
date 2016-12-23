(function () {
    
    _run.$inject = ['$rootScope', '$state', '$stateParams'];
    _config.$inject = ['$locationProvider', '$stateProvider'];

    angular
        .module('projectTracker')
        .run(_run)
        .config(_config);

    function _run($rootScope, $state, $stateParams, $cookieStore, $http) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($state !== 'login' && !$rootScope.globals.currentUser) {
                $state.go('login');
            }
        });
    }

    function _config($locationProvider, $stateProvider) {
        $stateProvider
            .state("layout", {
                abstract: true,
                url: '/?search',                
                views: {
                    '': { templateUrl: '/app/layout/layout.view.tmpl.html' },
                    'header@layout': { 
                        templateUrl: '/app/layout/header.view.tmpl.html',
                        controller: 'headerController as headerCtrl' },
                    'footer@layout': { 
                        templateUrl: '/app/layout/footer.view.tmpl.html'}
                },
                
            });

        $locationProvider.html5Mode(true);
    }
})();