(function () {

    _controller.$inject = ['$scope', '$rootScope', '$location', 'AuthService'];

    angular
        .module('authentication')
        .controller('authLoginController', _controller);

    function _controller($scope, $rootScope, $location, AuthService) {
        // reset login status
        AuthService.ClearCredentials();

        $scope.login = function () {
            $scope.dataLoading = true;
            AuthService.Login($scope.username, $scope.password, function (response) {
                if (response.success) {
                    AuthService.SetCredentials($scope.username, $scope.password);
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }
})();