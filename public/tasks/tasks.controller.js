angular
    .module('projectTracker')
    .controller('tasksController', function (Task) {
        var self = this;

        self.newTask = {};
        self.initializing = true;

        Task.get().success(function (data) {
            self.tasks = data;
        }).finally(function () {
            self.initializing = false;
        });

        self.createTask = _createTask;
        self.updateTask = _updateTask;
        self.deleteTask = _deleteTask;

        function _createTask() {
            if (!self.newTask.name)
                return;

            self.loading = true;

            return Task.save(self.newTask)
                .success(function(data) {
                    self.tasks.push(data);
                    self.newTask = {};
                })
                .finally(function() {
                    self.loading = false;
                });
        }

        function _updateTask(task) {

            self.loading = true;
            
            return Task.update(task).finally(function () {                
                self.loading = false;
            });
        }

        function _deleteTask(task) {
            self.loading = true;
            
            Task.delete(task.id).success(function (data) {
                _.remove(self.tasks, {id: task.id});
            }).finally(function () {
                self.loading = false;
            });
        }
    });