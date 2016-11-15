(function () {
    angular
        .module('projectTracker')
        .factory('Task', _resourceInitializer);

    _resourceInitializer.$inject = ['$resource', 'toastr'];

    function _resourceInitializer($resource, toastr) {
        return $resource('/api/task/:id', {}, {
            'get': {
                method: 'GET', interceptor: {
                    responseError: _resourceErrorHandler,
                    //response: _resourceHandler,
                }
            },
            'save': {
                method: 'POST', interceptor: {
                    responseError: _resourceErrorHandler,
                    //response: _resourceHandler,
                }
            },
            'query': {
                method: 'GET', isArray: true, interceptor: {
                    responseError: _resourceErrorHandler,
                    //response: _resourceHandler,
                }
            },
            'delete': {
                method: 'DELETE', interceptor: {
                    responseError: _resourceErrorHandler,
                    //response: _resourceHandler,
                }
            }
        });
    }

    function _resourceHandler(response) {
        return response.resource;
    }

    function _resourceErrorHandler(response) { }
})();