angular.module('todo.service', [])
    .factory('Todo', function ($http) {
        return {
            get: function () {
                return $http.get('/api/todo');
            },
            create: function (todo) {
                return $http.post('/api/todo', { todo });
            },
            enable: function (id) {
                return $http.post('/api/todo/enable/' + id);
            },
            disable: function (id) {
                return $http.post('/api/todo/disable/' + id);
            },
            delete: function (id) {
                return $http.delete('/api/todo/' + id);
            }
        };
    });
