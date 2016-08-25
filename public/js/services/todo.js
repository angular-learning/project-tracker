angular.module('todo.services', [])
	.factory('Todos', function() {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				return $http.post('/api/todos', { data: todoData });
			}
		};
	});