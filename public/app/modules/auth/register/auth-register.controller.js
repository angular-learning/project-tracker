(function () {

    _controller.$inject = ['$scope', '$state', 'AuthService'];

    angular
        .module('projectTracker')
        .controller('registerController', _controller);

    function _controller($scope, $state, AuthService) {
        $scope.register = function () {

            // initial values
            $scope.error = false;
            $scope.disabled = true;

            var username = $scope.registerForm.username;
            var password = $scope.registerForm.password;

            // call register from service
            AuthService.register(username, password)
                // handle success
                .then(function () {
                    AuthService.login(username, password)
                        // handle success
                        .then(function () {
                            $state.go('layout.tasks');
                            $scope.disabled = false;
                            $scope.registerForm = {};
                        })
                })
                // handle error
                .catch(function () {
                    $scope.error = true;
                    $scope.errorMessage = "Something went wrong!";
                    $scope.disabled = false;
                    $scope.registerForm = {};
                });
        };
    }
})();