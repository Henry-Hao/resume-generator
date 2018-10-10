define([
    'main'
], function(ngModule) {
    'use strict';
    return ngModule.directive("educationInput",function($compile, dateFormatService){
        return {
            templateUrl: '/app/static/view/component/educationInput.html',
            restrict: 'E',
            scope:{
                // only inherit education_list from the parent
                // thus all the 'scope.education_list' will refer to the same object defined in the resumeController
                education_list: '=education'
            },
            link: function(scope, element, attrs){
                scope.obj = new Education();
                // this variable will be independent from the parent
                scope.isEnabled = true;

                // put all the DOM manipulations in directives
                scope.addFn = function(){
                    if(scope.form.$valid){
                        scope.education_list.push(scope.obj);
                        angular.element("#education_list").append($compile(`<education-input education="education_list"></education-input>`)(scope));
                        scope.isEnabled = !scope.isEnabled;
                    }
                    // TODO:
                    // trigger ngMessage validations
                }

                scope.removeFn = function(){
                    var idx = scope.education_list.indexOf(scope.obj);
                    if(idx >= 0)
                    scope.education_list.splice(idx, 1);
                        angular.element('#education_list education-input')[idx].remove();
                }

                scope.formatDate = dateFormatService.formatDate;
            }
        }
    })
});