(function () {

    _controller.$inject = ['$state', '$stateParams', 'AuthService'];

    angular
        .module('projectTracker')
        .controller('headerController', _controller);

    function _controller($state, $stateParams, AuthService) {
        var self = this;
        self.searchRequest = $stateParams.search;

        self.search = _search;
        self.updateSearchRequest = _.debounce(_search, 200);
        self.logout = _logout;

        function _search() {
            $state.go('.', { search: self.searchRequest }, { reload: 'layout.tasks' });
        }

        function _logout() {
            AuthService.logout().then($state.go('login'));            
        }
    }
})();