(function () {

    _controller.$inject = ['History'];

    angular
        .module('projectTracker')
        .controller('taskHistoryController', _controller);

    function _controller(History) {
        var self = this;

        self.clear = _clearAllItems;
                
        History.query(function (data) { 
             self.source = data;
            });    
        
        function _clearAllItems(){ 
            History.delete();
            self.source = undefined;
        }
    }
})();