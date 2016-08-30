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
        };

        function removeItemFromArray (array, item) {
            var index = _.findIndex(array, function (i) { return i.id === item.id; });
            array.splice(index, 1);
        }

        function moveItemBetweenArrays (sourceArray, destArray, item) {
            removeItemFromArray(sourceArray, item);
            destArray.push(item);
        }

        self.switchTodo = function (todo) {
            self.loading = true;
            
            Todo.update(todo).success(function (data) {
                if (todo.done) {
                    moveItemBetweenArrays(self.todos, self.dones, todo);
                } else {
                    moveItemBetweenArrays(self.dones, self.todos, todo);
                }
                
            }).finally(function () {
                self.loading = false;
            });
        };

        self.deleteTodo = function(todo) {
            self.loading = true;
            
            Todo.delete(todo.id).success(function (data) {
                if (todo.done) {
                    removeItemFromArray(self.dones, todo);
                } else {
                    removeItemFromArray(self.todos, todo);
                }
            }).finally(function () {
                self.loading = false;
            });
        }
    });