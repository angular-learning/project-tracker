var app = angular.module('project-tracker', ['ui.router']);//'todo.services', 'main']);

app.factory('Todo', function ($http) {
    return {
        get: function () {
            return $http.get('/api/todo');
        },
        create: function (todoData) {
            return $http.post('/api/todo', { data: todoData });
        },
        delete: function (id) {
            return $http.delete('/api/todo/' + id );
        }
    };
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'index.html',
            controller: 'mainController'
        });

    $urlRouterProvider.otherwise('/');
});

app.controller('mainController', function ($scope, $state, Todo) {

    $scope.newTodo = { text: '' };
    $scope.loading = true;

    Todo.get().success(function (data) {
        $scope.todos = data;
        $scope.loading = false;
    });

    $scope.createTodo = function () {
        $scope.loading = true;

        if ($scope.newTodo.text !== '') {
            Todo.create($scope.newTodo)
                .success(function (data) {
                    $scope.newTodo = { text: '' };
                    $scope.todos = data;
                    $scope.loading = false;
                })
                .error(function (data, status) { $scope.loading = false; });
        }
    };

    $scope.deleteTodo = function (id) {
        $scope.loading = true;

        Todo.delete(id).success(function (data) {
            var index = $.grep($scope.todos, function (e) { return e._id == data; });
            $scope.todos.splice(index, 1);
            $scope.loading = false;
        });
    };
});
