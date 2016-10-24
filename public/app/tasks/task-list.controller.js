(function () {

    _controller.$inject = ['Task', 'toastr', '$state', '$stateParams'];

    angular
        .module('projectTracker')
        .controller('taskListController', _controller);

    function _controller(Task, toastr, $state, $stateParams) {
        var self = this;

        self.newTask = {};
        self.initializing = true;
        self.selectedId = $stateParams.id;
                
        Task.query(function (data) { 
            self.searchIndex = _initSearchIndex(data); 
            if ($stateParams.search) {
                var foundIds = self.searchIndex.search($stateParams.search)
                    .map(function(doc) { return doc.ref; });
                var filteredData = _(data).keyBy('id').at(foundIds).filter().value();
                _initList(filteredData);   
            }
            else {
                _initList(data);
            }
        });    

        self.createTask = _createTask;
        self.updateTask = _updateTask;
        self.deleteTask = _deleteTask;
        self.selectTask = _selectTask;

        function _initList(data) {
            self.tasks = data;
            self.initializing = false;
        }

        function _createTask() {
            if (!self.newTask.title)
                return;

            self.loading = true;

            return Task.save(self.newTask, function (task) {
                self.tasks.push(task);
                toastr.info('Task ' + self.newTask.title + ' created!');
                self.searchIndex.add(task);
                self.newTask = {};
            }).$promise.finally(function () {
                self.loading = false;
            });
        }

        function _updateTask(task) {

            self.loading = true;

            return Task.save({ id: task.id }, task).$promise.finally(function () {
                self.searchIndex.update(task);
                self.loading = false;
            });
        }

        function _deleteTask(task) {
            self.loading = true;

            Task.delete({ id: task.id }, function (data) {
                _.remove(self.tasks, { id: task.id });
                self.searchIndex.remove(task);
            }).$promise.finally(function () {
                self.loading = false;
            });
        }

        function _selectTask(task) {
            if (task) {
                self.selectedId = task.id;
                $state.go('details', {id: task.id, task: task}, {reload: 'details'});
            }
            else {
                self.selectedId = undefined;
                $state.go('layout.tasks');
            }
        }

        function _initSearchIndex(data){
            var searchIndex = lunr(function () {
                this.field('title', {boost: 50});
                this.ref('id');
            });

            for (var item in data) {
                searchIndex.add(data[item]);
            }

            return searchIndex;
        }
    }
})();