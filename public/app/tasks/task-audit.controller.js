(function () {

    _controller.$inject = ['Audit'];

    angular
        .module('projectTracker')
        .controller('taskAuditController', _controller);

    function _controller(Audit) {
        var self = this;
                
        Audit.query(function (data) { 
             //self.source = data;
        });    
    }
})();