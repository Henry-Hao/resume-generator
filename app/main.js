define([
    'angular',
    'ui-bootstrap',
    'ngRoute',
    'messages',
    'material',
],function(angular){
    'use strict';

    // initialize angular
    var app = angular.module('myApp',[
        'ui.bootstrap',
        'ui.router',
        'ngMessages',
        'ngMaterial',
    ]);

    // basic configurations of fileters, routers, etc.
    app.config(function ($controllerProvider, $filterProvider,$urlRouterProvider,$stateProvider,$mdDateLocaleProvider,$qProvider) {
        app.controllerProvider = $controllerProvider;
        app.filterProvider = $filterProvider;

        $qProvider.errorOnUnhandledRejections(false);   

        $urlRouterProvider.when('','/resume');
        var VIEW_ROOT = '/app/static/view'
        
        var states = [
            {
                name: 'resume',
                url: '/resume',
                templateUrl: VIEW_ROOT + '/resume.html',
                controller: 'resumeController'
            }
        ];

        states.forEach(state => {
            $stateProvider.state(state);

            
        });

        // format date
        $mdDateLocaleProvider.formatDate = function(date) {
            if(date != null && date != undefined && date != "")
                return new Date(date).toISOString().substring(0,7).replace('-','.');
            return "";
        };

    });
    
    return app;
})