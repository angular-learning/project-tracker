angular.module('todo', [])
    .controller('mainController', function ($scope, $state, $http, Todo) {

        $scope.newTodo = {};
        $scope.loading = true;

        Todo.get().success(function (data) {
            $scope.todos = data;
            $scope.loading = false;
        });

        $scope.createTodo = function (newTodo) {
            $scope.loading = true;

            if (newTodo.text !== undefined) {
                Todo.create(newTodo).success(function (data) {
                    $scope.newTodo = {};
                    $scope.todos = data;
                });
            }
        };

        $scope.deleteTodo = function (id) {
            $scope.loading = true;

            Todo.delete(id).success(function (data) {

            });
        };
    });