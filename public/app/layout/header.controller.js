(function () {

    _controller.$inject = ['$state', '$stateParams'];

    angular
        .module('projectTracker')
        .controller('headerController', _controller);
    
    function _controller($state, $stateParams) {
        var self = this;
        self.searchRequest = $stateParams.search;

        self.search = _search;

        function _search() {
            $state.go('.', {search: self.searchRequest});
        }
    }
})();