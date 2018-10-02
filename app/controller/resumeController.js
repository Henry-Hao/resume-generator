define([
    // include ngmodule
    'main'
], function(ngModule) {
    return ngModule
    .controller('resumeController',function($scope){
        $scope.header = 'Basic';
    })
    .config(function($mdThemingProvider) {
        // Configure a dark theme with primary foreground yellow
    
        $mdThemingProvider.theme('docs-dark', 'default')
          .primaryPalette('green')
          .dark();
    
      });
});