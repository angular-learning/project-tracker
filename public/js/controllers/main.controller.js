angular.module('main.controller', [])
    .controller('mainController', function ($scope, Todo) {

        $scope.newTodo = {};
        $scope.loading = true;

        Todo.get().success(function (data) {
            $scope.todos = data.filter(function (e) { return !e.done; });
            $scope.dones = data.filter(function (e) { return e.done; });
            $scope.loading = false;
        });

        $scope.createTodo = function () {
            if (!$scope.newTodo.text)
                return;

            $scope.loading = true;

            Todo.create($scope.newTodo)
                .success(function(data) {
                    $scope.todos.push(data);
                    $scope.newTodo = {};
                })
                .error(function(data, status) {
                    $scope.error = status;
                })
                .finally(function() {
                    $scope.loading = false;
                });
        };

        function removeItemFromArray (array, item) {
            var index = 0;
            array.some(function (entry, i) {
                            if (entry.id === item.id) {
                                index = i;
                                return true;
                            }
            });

            array.splice(index, 1);
        }

        function moveItemBetweenArrays (sourceArray, destArray, item) {
            removeItemFromArray(sourceArray, item);
            destArray.push(item);
        }

        $scope.switchTodo = function (todo) {
            $scope.loading = true;

            if (!todo.done) {
                Todo.disable(todo.id).success(function (data) {
                    replaceItem($scope.dones, $scope.todos, todo);
                }).finally(function () {
                    $scope.loading = false;
                });
            } else {
                Todo.enable(todo.id).success(function (data) {
                    moveItemBetweenArrays($scope.todos, $scope.dones, todo);
                }).finally(function () {
                    $scope.loading = false;
                });
            }
        };

        $scope.deleteTodo = function(todo) {
            $scope.loading = true;
            
            Todo.delete(todo.id).success(function (data) {
                if (!todo.done) {
                    removeItemFromArray($scope.todos, todo);
                } else {
                    removeItemFromArray($scope.dones, todo);
                }
            }).finally(function () {
                $scope.loading = false;
            });
        }
    });