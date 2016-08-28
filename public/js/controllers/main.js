angular.module('main', [])
    .controller("mainController", function ($scope, $state, Todo) {

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