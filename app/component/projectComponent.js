define([
    'main'
], function(ngModule) {
    'use strict';
    return ngModule.directive("project",function($compile, dateFormatService){
        return {
            templateUrl: '/app/static/view/component/project.html',
            restrict: 'E',
            scope:{
                // only inherit education_list from the parent
                // thus all the 'scope.education_list' will refer to the same object defined in the resumeController
                project_list: '=projects'
            },
            link: function(scope, element, attrs){
                scope.obj = new Skill_group();
                // this variable will be independent from the parent
                scope.isEnabled = true;

                // put all the DOM manipulations in directives
                scope.addFn = function(){
                    if(scope.form.$valid){
                        scope.project_list.push(scope.obj);
                        angular.element("#skill_group").append($compile(`<project projects="project_list"></project>`)(scope));
                        scope.isEnabled = !scope.isEnabled;
                    }
                    // TODO:
                    // trigger ngMessage validations
                }

                scope.removeFn = function(){
                    var idx = scope.project_list.indexOf(scope.obj);
                    if(idx >= 0)
                    scope.project_list.splice(idx, 1);
                        angular.element('#project_list project')[idx].remove();
                }

                scope.formatDate = dateFormatService.formatDate;
            }
        }
    })
});