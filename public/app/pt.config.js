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
                url: '/?search',                
                views: {
                    '': { templateUrl: '/app/layout/layout.view.tmpl.html' },
                    'header@layout': { 
                        templateUrl: '/app/layout/header.view.tmpl.html',
                        controller: 'layoutController as layoutCtrl' },
                    'footer@layout': { 
                        templateUrl: '/app/layout/footer.view.tmpl.html', 
                        controller: 'layoutController as layoutCtrl'}
                },
                
            });

        $locationProvider.html5Mode(true);
    }
})();