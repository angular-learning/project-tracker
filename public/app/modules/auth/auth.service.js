(function () {
    angular
        .module('projectTracker')
        .factory('AuthService', _initializer);

    _initializer.$inject = ['$q', '$timeout', '$http'];

    function _initializer($q, $timeout, $http) {

        // create user variable
        var user = null;

        // return available functions for use in the controllers
        return ({
            isLoggedIn: _isLoggedIn,
            getUserStatus: _getUserStatus,
            login: _login,
            logout: _logout,
            register: _register
        });

        function _isLoggedIn() {
            if (user) {
                return true;
            } else {
                return false;
            }
        }

        function _getUserStatus() {
            return $http.get('api/user/status')
                // handle success
                .success(function (data) {
                    if (data.status) {
                        user = true;
                    } else {
                        user = false;
                    }
                })
                // handle error
                .error(function (data) {
                    user = false;
                });
        }

        function _login(username, password) {
            // create a new instance of deferred
            var deferred = $q.defer();

            // send a post request to the server
            $http.post('api/user/login',
                { username: username, password: password })
                // handle success
                .success(function (data, status) {
                    if (status === 200 && data.status) {
                        user = true;
                        deferred.resolve();
                    } else {
                        user = false;
                        deferred.reject();
                    }
                })
                // handle error
                .error(function (data) {
                    user = false;
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;
        }

        function _logout() {
            // create a new instance of deferred
            var deferred = $q.defer();

            // send a get request to the server
            $http.get('api/user/logout')
                // handle success
                .success(function (data) {
                    user = false;
                    deferred.resolve();
                })
                // handle error
                .error(function (data) {
                    user = false;
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;
        }

        function _register(username, password) {
            // create a new instance of deferred
            var deferred = $q.defer();

            // send a post request to the server
            $http.post('api/user/register',
                { username: username, password: password })
                // handle success
                .success(function (data, status) {
                    if (status === 200 && data.status) {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                })
                // handle error
                .error(function (data) {
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;
        }
    }
})();