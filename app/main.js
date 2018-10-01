define([
    'angular',
    'ui-bootstrap',
    'ngRoute',
    'ngScroll',
    'material'
],function(angular){
    'use strict';

    // initialize angular
    var app = angular.module('myApp',[
        'ui.bootstrap',
        'ui.router',
        'duScroll',
        'ngMaterial',
        'ngMessages'
    ]);

    // basic configurations of fileters, routers, etc.
    app.config(function ($controllerProvider, $filterProvider,$urlRouterProvider,$stateProvider) {
        app.controllerProvider = $controllerProvider;
        app.filterProvider = $filterProvider;

        $urlRouterProvider.when('','/resume');
        var VIEW_ROOT = '/app/static/view'
        
        var states = [
            {
                name: 'resume',
                url: '/resume',
                templateUrl: VIEW_ROOT + '/resume.html',
                controller: 'resumeController'
            },
            {
                name: 'resume.basic',
                url: '#basic',
                templateUrl: VIEW_ROOT + '/resume.html#basic'
            },
            {
                name: 'resume.skill',
                url: '#skill',
                templateUrl: VIEW_ROOT + '/resume.html#skill'
            }
        ]

        states.forEach(state => {
            $stateProvider.state(state);
        });
    });
    
    return app;
})