(function () {

    _config.$inject = ['$stateProvider', '$urlRouterProvider'];

    angular
        .module('projectTracker')
        .config(_config);

    function _config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise(function ($injector, $location) {
            $injector.invoke(['$state', function ($state) {
                $state.go('login');
            }]);
        });

        $stateProvider
            .state('login', {
                url: '/login/',
                templateUrl: '/app/modules/auth/login/auth-login.view.tmpl.html',
                controller: 'loginController as loginCtrl'
            })
            .state('register', {
                url: '/register/',
                templateUrl: '/app/modules/auth/register/auth-register.view.tmpl.html',
                controller: 'registerController as regCtrl'
            });
    }
})();