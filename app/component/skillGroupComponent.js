define([
    'main'
], function(ngModule) {
    'use strict';
    return ngModule.directive("skillGroup",function($compile){
        return {
            templateUrl: '/app/static/view/component/skillGroup.html',
            restrict: 'E',
            scope:{
                // only inherit education_list from the parent
                // thus all the 'scope.education_list' will refer to the same object defined in the resumeController
                skill_group: '=skills'
            },
            link: function(scope, element, attrs){
                scope.obj = new Skill_group();
                // this variable will be independent from the parent
                scope.isEnabled = true;

                // put all the DOM manipulations in directives
                scope.addFn = function(){
                    if(scope.form.$valid){
                        scope.skill_group.push(scope.obj);
                        angular.element("#skill_group").append($compile(`<skill-group skills="skill_group"></skill-group>`)(scope));
                        scope.isEnabled = !scope.isEnabled;
                    }
                    // TODO:
                    // trigger ngMessage validations
                }

                scope.removeFn = function(){
                    var idx = scope.skill_group.indexOf(scope.obj);
                    if(idx >= 0)
                    scope.skill_group.splice(idx, 1);
                        angular.element('#skill_group skill-group')[idx].remove();
                }
            }
        }
    })
});