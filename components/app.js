var myApp = angular.module('wmt', [
    'ui.router',
    'wmt-table'
]);
myApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('greeting', {
            name: 'greeting',
            url: '/',
            templateUrl: 'components/task-greeting/templates/task-greeting.tmpl.html'
        })
        .state('table', {
            name: 'table',
            url: '/table',
            templateUrl: 'components/task-table/templates/task-table.tmpl.html'
        })
    ;
    $urlRouterProvider
        .otherwise('/');
});