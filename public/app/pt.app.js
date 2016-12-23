(function () {
    angular   
        .module('projectTracker', ['ui.router', 'ngResource', 'ngAnimate', 'toastr'])
        .module('authentication', [])
        .module('BasicHttpAuthExample', ['Authentication', 'ngRoute', 'ngCookies']);
})();