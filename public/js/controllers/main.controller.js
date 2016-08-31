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

        self.createTodo = _createTodo;
        self.updateTodo = _updateTodo;
        self.deleteTodo = _deleteTodo;

        self.isAddButtonDisabled = _isAddButtonDisabled;

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

        function _isAddButtonDisabled() {
            return self.newTodo.text ? false : true;
        }
    });