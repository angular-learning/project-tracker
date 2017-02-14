(function () {

    _config.$inject = ['$stateProvider', '$urlRouterProvider'];

    angular
        .module('projectTracker')
        .config(_config);

    function _config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: 'login/',
                templateUrl: '/app/modules/auth/login/auth-login.view.tmpl.html',
                controller: 'loginController as loginCtrl'
            });
    }
})();