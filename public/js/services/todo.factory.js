angular
    .module('project-tracker')
    .factory('Todo', function ($http) {
        return {
            get: function () {
                return $http.get('/api/todo');
            },
            create: function (todo) {
                return $http.post('/api/todo', todo);
            },
            update: function (todo) {
                return $http.post('/api/todo/update/', todo);
            },
            delete: function (id) {
                return $http.delete('/api/todo/' + id);
            }
        };
    });
