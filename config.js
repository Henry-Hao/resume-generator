require.config({
    // include the third-party libs 
    paths:{
        jquery: 'node_modules/jquery/dist/jquery.min',
        angular: 'node_modules/angular/angular.min',
        ngRoute: 'node_modules/@uirouter/angularjs/release/angular-ui-router',
        'ui-bootstrap':'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls',
        ngScroll: 'node_modules/angular-scroll/angular-scroll',
        material: 'node_modules/angular-material/angular-material',
        aria: 'node_modules/angular-aria/angular-aria',
        animate: 'node_modules/angular-animate/angular-animate',
        messages: 'node_modules/angular-messages/angular-messages',

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
        },
        ngScroll: {
            deps: ['angular']
        },
        material: {
            deps: ['angular','aria','animate','messages']
        },
        aria: {
            deps: ['angular']
        },
        animate: {
            deps: ['angular']
        },
        messages: {
            deps: ['angular']
        }
    }
});

require(['jquery'],function(jquery){
    require([
        'angular',
        'main',

        // controller
        'app/controller/indexController',
        'app/controller/resumeController',
        
        // component
        'app/component/educationInputComponent',
        'app/component/skillGroupComponent',
        'app/component/projectComponent',

        // data
        'app/data/skill_group',
        'app/data/education',
        'app/data/reward',
        'app/data/project',
        'app/data/resume',

    ],function(angular){
        // bootstrap
        angular.bootstrap(document.documentElement, ['myApp']);
    })
})