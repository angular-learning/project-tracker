(function () {

    _controller.$inject = ['$scope', '$state', 'AuthService'];

    angular
        .module('projectTracker')
        .controller('loginController', _controller);

    function _controller($scope, $state, AuthService) {
        AuthService.getUserStatus().then(function () {
            if (AuthService.isLoggedIn()) {
                $state.go('layout.tasks');
            }
        });

        $scope.login = function () {

            // initial values
            $scope.error = false;
            $scope.disabled = true;

            // call login from service
            AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                // handle success
                .then(function () {
                    $state.go('layout.tasks');
                    $scope.disabled = false;
                    $scope.loginForm = {};
                })
                // handle error
                .catch(function () {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    $scope.disabled = false;
                    $scope.loginForm = {};
                });
        };
    }
})();