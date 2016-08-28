angular.module('main', [])
    .controller('mainController', function ($scope, $state, $http, Todo) {

        $scope.newTodo = "";
        $scope.loading = true;

        Todo.get().success(function (data) {
            $scope.todos = data;
            $scope.loading = false;
        });

        $scope.createTodo = function (newTodo) {
            $scope.loading = true;

            if (newTodo.text !== "") {
                Todo.create(newTodo).success(function (data) {
                    $scope.newTodo = "";
                    $scope.todos = data;
                    $scope.loading = false;
                });
            }
        };

        $scope.deleteTodo = function (id) {
            $scope.loading = true;

            Todo.delete(id).success(function (data) {
                $scope.loading = false;
            });
        };
});