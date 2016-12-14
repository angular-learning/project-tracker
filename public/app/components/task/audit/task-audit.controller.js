(function () {

    _controller.$inject = ['Audit'];

    angular
        .module('projectTracker')
        .controller('taskAuditController', _controller);

    function _controller(Audit) {
        var self = this;

        self.clear = _clearAllItems;
                
        Audit.query(function (data) { 
             self.source = data;
            });    
        
        function _clearAllItems(){ 
            Audit.delete();
            self.source = undefined;
        }
    }
})();