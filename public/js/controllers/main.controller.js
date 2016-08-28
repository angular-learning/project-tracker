angular.module('main.controller', [])
    .controller("mainController", function ($scope, $state, Todo) {

        $scope.newTodo = {};
        $scope.loading = true;

        Todo.get().success(function (data) {
            $scope.todos = data.filter(function (e) { return !e.done; });
            $scope.dones = data.filter(function (e) { return e.done; });
            $scope.loading = false;
        });

        $scope.createTodo = function () {
            $scope.loading = true;
            if ($scope.newTodo.text !== undefined) {
                Todo.create($scope.newTodo)
                    .success(function (data) {
                        var todos = $scope.todos;
                        todos.push(data);

                        $scope.newTodo = {};
                        $scope.loading = false;
                    })
                    //TODO: it would be nice if we can bind error status right to the view
                    .error(function(data, status) {
                        $scope.loading = false;
                        $scope.error = status;
                    });
            }
        };

        $scope.removeItemFromArray = function (array, item) {
            var index = 0;
            array.some(function (entry, i) {
                            if (entry.id === item.id) {
                                index = i;
                                return true;
                            }
            });

            array.splice(index, 1);
        }

        $scope.replaceItem = function (sourceArray, destArray, item) {
            $scope.removeItemFromArray(sourceArray, item);
            destArray.push(item);
        }

        $scope.switchTodo = function (todo) {
            $scope.loading = true;
            var todos = $scope.todos;
            var dones = $scope.dones;

            if (!todo.done) {
                Todo.disable(todo.id).success(function (data) {
                    $scope.replaceItem(dones, todos, todo);
                    $scope.loading = false;
                }); 
            } else {
                Todo.enable(todo.id).success(function (data) {
                    $scope.replaceItem(todos, dones, todo);
                    $scope.loading = false;
                });
            }
        };

        $scope.deleteTodo = function(todo) {
            $scope.loading = true;
            var todos = $scope.todos;
            var dones = $scope.dones;
            
            Todo.delete(todo.id).success(function (data) {
                if (!todo.done) {
                    $scope.removeItemFromArray(todos, todo);
                } else {
                    $scope.removeItemFromArray(dones, todo);
                }
                $scope.loading = false;
            });
        }
    });