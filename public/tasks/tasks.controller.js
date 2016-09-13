angular
    .module('projectTracker')
    .controller('tasksController', function (Task) {
        var self = this;

        self.newTask = {};
        self.initializing = true;

        Task.query(function(data) {
            self.tasks = data;
            self.initializing = false;
        });

        self.createTask = _createTask;
        self.updateTask = _updateTask;
        self.deleteTask = _deleteTask;

        function _createTask() {
            if (!self.newTask.name)
                return;

            self.loading = true;

            return Task.save(self.newTask, function(data) {
                    self.tasks.push(data);
                    self.newTask = {};
                }).$promise.finally(function() {
                    self.loading = false;
                });
        }

        function _updateTask(task) {

            self.loading = true;
            
            return Task.save({id: task.id}, task).$promise.finally(function () {                
                self.loading = false;
            });
        }

        function _deleteTask(task) {
            self.loading = true;
            
            Task.delete({id: task.id}, function (data) {
                    _.remove(self.tasks, {id: task.id});
                }).$promise.finally(function () {
                    self.loading = false;
                });
        }
    });