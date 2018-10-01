define([
    // include ngmodule
    'main'
], function(ngModule) {
    return ngModule.controller('resumeController',function($scope){
        $scope.header = 'Basic';
    });
    
});