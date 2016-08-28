angular.module('todo.service', [])
    .factory('Todo', function ($http) {
        return {
            get: function () {
                return $http.get('/api/todo');
            },
            create: function (todoData) {
                return $http.post('/api/todo', { data: todoData });
            },
            enable: function (id) {
                return $http.post('/api/enable/' + id);
            },
            disable: function (id) {
                return $http.post('/api/disable/' + id);
            },
            delete: function (id) {
                return $http.post('/api/delete/' + id);
            }
        };
    });
