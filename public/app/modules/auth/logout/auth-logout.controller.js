(function () {

    _controller.$inject = ['$scope', '$location', 'AuthService'];

    angular
        .module('projectTracker')
        .controller('logoutController', _controller);

    function _controller($scope, $location, AuthService) {

        $scope.logout = function () {
            // call logout from service
            AuthService.logout()
                .then(function () {
                    $location.path('/login');
                });
        };
    }
})();