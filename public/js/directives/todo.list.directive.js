angular
    .module('project-tracker')
    .directive('ptTodoList', function() {
        var controller = function (Todo) {

            var self = this;

            _init();

            self.update = _update;
            
            function _update(todo) {
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

            function _init() {
                self.items = angular.copy(self.datasource);
            }

            function _removeItemFromArray(array, item) {
                var index = _.findIndex(array, function (i) { return i.id === item.id; });
                array.splice(index, 1);
            }

            function _moveItemBetweenArrays(sourceArray, destArray, item) {
                _removeItemFromArray(sourceArray, item);
                destArray.push(item);
            }
        };
        
        return {            
            restrict: 'EA',
            scope: {
                datasource: '=',
            },
            controller: controller,
            controllerAs: 'self',
            bindToController: true,
            templateUrl: '././templates/todo.list.tmpl.html'
        }
    });