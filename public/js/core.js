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

app.controller("mainController", function ($scope, $state, Todo) {

    $scope.newTodo = { text: "" };
    $scope.loading = true;

    Todo.get().success(function (data) {
        $scope.todos = data;
        $scope.loading = false;
    });

    $scope.createTodo = function () {
        $scope.loading = true;
        if ($scope.newTodo.text !== "") {
            Todo.create($scope.newTodo)
                .success(function (data) {
                    $scope.newTodo = { text: "" };

                    var todos = $scope.todos;
                    todos.push(data);

                    $scope.loading = false;
                })
                .error(function (data, status) { $scope.loading = false; });
        }
    };

    $scope.deleteTodo = function (id) {
        $scope.loading = true;

        Todo.delete(id).success(function (data) {
            //TODO: get working code to detect index of deleted item
            var index = 0;
            var todos = $scope.todos; 
            todos.some(function (entry, i) {
                if (entry.id === id) {
                    index = i;
                    return true;
                }
            });
            todos.splice(index, 1);
            $scope.loading = false;
        });
    };
});
