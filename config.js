require.config({
    // include the third-party libs 
    paths:{
        jquery: '/node_modules/jquery/dist/jquery.min',
        angular: '/node_modules/angular/angular.min',
        ngRoute: '/node_modules/@uirouter/angularjs/release/angular-ui-router',
        'ui-bootstrap':'/node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls',

        // initialization of angular
        main: 'app/main',
    },
    // preprocess non-AMD libs
    shim:{
        angular:{
            exports: "angular"
        },
        'ui-bootstrap': {
            deps: ['angular']
        },
        ngRoute: {
            deps: ['angular']
        }
    }
});

require(['jquery'],function(jquery){
    require([
        'angular',
        'main',

        // controller
        'app/controller/indexController'
    ],function(angular){
        // bootstrap
        angular.bootstrap(document.documentElement, ['myApp']);
    })
})