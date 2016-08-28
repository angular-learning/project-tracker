angular.module('todo.services', [])
	.factory('Todo', function() {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				return $http.post('/api/todos', { data: todoData });
			}
		};
	});