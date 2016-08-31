angular
    .module('project-tracker')
    .controller('mainController', function (Todo) {
        var self = this;

        self.newTodo = {};
        self.initializing = true;

        Todo.get().success(function (data) {
            self.todos = data.filter(function (e) { return !e.done; });
            self.dones = data.filter(function (e) { return e.done; });
        }).finally(function () {
            self.initializing = false;
        });

        self.createTodo = _createTodo;
        self.updateTodo = _updateTodo;
        self.deleteTodo = _deleteTodo;

        function _createTodo() {
            if (!self.newTodo.text)
                return;

            self.loading = true;

            return Todo.create(self.newTodo)
                .success(function(data) {
                    self.todos.push(data);
                    self.newTodo = {};
                })
                .finally(function() {
                    self.loading = false;
                });
        }

        function _updateTodo(todo) {
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

        function _deleteTodo(todo) {
            self.loading = true;
            
            Todo.delete(todo.id).success(function (data) {
                if (todo.done) {
                    _.remove(self.dones, {id: todo.id});
                } else {
                    _.remove(self.todos, {id: todo.id});
                }
            }).finally(function () {
                self.loading = false;
            });
        }

        function _moveItemBetweenArrays (sourceArray, destArray, item) {
            _.remove(sourceArray, {id: item.id});
            destArray.push(item);
        }
    });