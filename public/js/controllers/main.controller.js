angular
    .module('project-tracker')
    .controller('mainController', function (Todo) {
        var self = this;

        self.newTodo = {};
        self.loading = true;

        Todo.get().success(function (data) {
            self.todos = data.filter(function (e) { return !e.done; });
            self.dones = data.filter(function (e) { return e.done; });
            self.loading = false;
        });

        self.createTodo = function () {
            if (!self.newTodo.text)
                return;

            self.loading = true;

            Todo.create(self.newTodo)
                .success(function(data) {
                    self.todos.push(data);
                    self.newTodo = {};
                })
                .error(function(data, status) {
                    self.error = status;
                })
                .finally(function() {
                    self.loading = false;
                });
        }

        self.updateTodo = function (todo) {
            self.loading = true;
            
            Todo.update(todo).success(function (data) {
                if (todo.done) {
                    _moveItemBetweenArrays(self.todos, self.dones, todo);
                } else {
                    _moveItemBetweenArrays(self.dones, self.todos, todo);
                }
                
            }).finally(function () {
                self.loading = false;
            });
        }

        self.deleteTodo = function(todo) {
            self.loading = true;
            
            Todo.delete(todo.id).success(function (data) {
                if (todo.done) {
                    _removeItemFromArray(self.dones, todo);
                } else {
                    _removeItemFromArray(self.todos, todo);
                }
            }).finally(function () {
                self.loading = false;
            });
        }

        function _removeItemFromArray (array, item) {
            var index = _.findIndex(array, function (i) { return i.id === item.id; });
            array.splice(index, 1);
        }

        function _moveItemBetweenArrays (sourceArray, destArray, item) {
            _removeItemFromArray(sourceArray, item);
            destArray.push(item);
        }
    });