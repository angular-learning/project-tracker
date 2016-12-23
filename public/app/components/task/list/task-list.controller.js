(function () {

    _controller.$inject = ['TaskService', 'toastr', '$state', '$stateParams'];

    angular
        .module('projectTracker')
        .controller('taskListController', _controller);

    function _controller(TaskService, toastr, $state, $stateParams) {
        var self = this;

        self.createTask = _createTask;
        self.updateTask = _updateTask;
        self.deleteTask = _deleteTask;
        self.selectTask = _selectTask;

        self.newTask = {};

        _initList(true);

        function _initSearch(data, query) {
            if (!query) return data;

            var foundIds = self.searchIndex.search(query)
                .map(function (doc) { return doc.ref; });

            return _(data).keyBy('id').at(foundIds).filter().value();
        }

        function _initList(needInitSearchIndex) {
            TaskService.getList().then(function (data) {

                if (needInitSearchIndex)
                    self.searchIndex = _initSearchIndex(data);

                self.tasks = _initSearch(data, $stateParams.search);
                _selectTask(_.find(self.tasks, { id: $stateParams.id }));
            });
        }

        function _createTask() {
            if (!self.newTask.title)
                return;

            return TaskService.create(self.newTask)
                .then(function (task) {
                    _initList(false);
                    toastr.info('Task ' + self.newTask.title + ' created!');
                    self.searchIndex.add(task);
                    self.newTask = {};
                });
        }

        function _updateTask(task) {
            return TaskService.update(task)
                .finally(function () {
                    self.searchIndex.update(task);
                });
        }

        function _deleteTask(task) {
            TaskService.delete(task.id)
                .then(function (data) {
                    _.remove(self.tasks, { id: task.id });
                    self.searchIndex.remove(task);

                    if (self.selectedId == task.id) {
                        _selectTask(undefined);
                    }
                });
        }

        function _selectTask(task) {
            if (task) {
                self.selectedId = task.id;
                $state.go('details', { id: task.id }, { reload: 'details' });
            }
            else {
                self.selectedId = undefined;
                $state.go('layout.tasks');
            }
        }

        function _initSearchIndex(data) {
            var searchIndex = lunr(function () {
                this.field('title', { boost: 50 });
                this.ref('id');
            });

            for (var item in data) {
                searchIndex.add(data[item]);
            }

            return searchIndex;
        }
    }
})();