angular.module('todo.service', [])
    .factory('Todo', function ($http) {
        return {
            get: function () {
                return $http.get('/api/todo');
            },
            create: function (todoData) {
                return $http.post('/api/todo', { data: todoData });
            },
            delete: function (id) {
                return $http.delete('/api/todo/' + id);
            }
        };
    });
