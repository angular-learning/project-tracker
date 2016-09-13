// angular
//     .module('projectTracker')
//     .factory('Task', function ($http) {
//         return {
//             get: function () {
//                 return $http.get('/api/task');
//             },
//             create: function (task) {
//                 return $http.post('/api/task', task);
//             },
//             update: function (task) {
//                 return $http.post('/api/task/' + task.id, task);
//             },
//             delete: function (id) {
//                 return $http.delete('/api/task/' + id);
//             }
//         };
//     });
angular
    .module('projectTracker')
    .factory('Task', function ($resource) {
        return $resource('/api/task/:id', { id: '@_id' }, {
            update: {
                method: 'PUT'
            }
        });
    });