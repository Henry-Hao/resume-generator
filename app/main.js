define([
    'angular',
    'ui-bootstrap',
    'ngRoute',
],function(angular){
    'use strict';

    // initialize angular
    var app = angular.module('myApp',['ui.bootstrap','ui.router']);

    // basic configurations of fileters, routers, etc.
    app.config(function ($controllerProvider, $filterProvider) {
        app.controllerProvider = $controllerProvider;
        app.filterProvider = $filterProvider;
    });
    
    return app;
})