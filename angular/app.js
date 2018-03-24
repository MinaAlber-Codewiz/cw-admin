var myApp = angular.module('cwAdmin', ["ngRoute"]);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'dashboard.html'
    })
    .when('/typography', {
        templateUrl: 'typography.html'
    })
    .when('/columns',{
        templateUrl: 'columns.html'
    })
    .when('/container-rows',{
        templateUrl: 'container-rows.html'
    })
    .when('/file-input-field',{
        templateUrl: 'file-input-field.html'
    })
    .when('/radio-input-field',{
        templateUrl: 'radio-input-field.html'
    })
    .when('/select-input-fields',{
        templateUrl: 'select-input-fields.html'
    })
    .when('/text-input-fields',{
        templateUrl: 'text-input-fields.html'
    })
    .when('/textarea-input-fields',{
        templateUrl: 'textarea-input-fields.html'
    })
    .when('/checkbox-input-field',{
        templateUrl: 'checkbox-input-field.html'
    })

    $locationProvider.hashPrefix('');

}]);

myApp.directive('rainbowBlock', function(){
    return{
        restrict: 'A',
        link: function(){
            Rainbow.color();
        }
    }
});
