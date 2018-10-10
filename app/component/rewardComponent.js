define([
    'main'
], function(ngModule) {
    'use strict';
    return ngModule
    
    .directive("reward",function($compile, dateFormatService){
        return {
            templateUrl: '/app/static/view/component/reward.html',
            restrict: 'E',
            scope:{
                // only inherit education_list from the parent
                // thus all the 'scope.education_list' will refer to the same object defined in the resumeController
                reward_list: '=rewards'
            },
            link: function(scope, element, attrs){
                

                scope.open = false;
                scope.obj = new Reward();
                // this variable will be independent from the parent
                scope.isEnabled = true;

                scope.now = new Date();

                // put all the DOM manipulations in directives
                scope.addFn = function(){
                    if(scope.form.$valid){
                        scope.reward_list.push(scope.obj);
                        angular.element("#reward_list").append($compile(`<reward rewards="reward_list"></reward>`)(scope));
                        scope.isEnabled = !scope.isEnabled;
                    }
                    // TODO:
                    // trigger ngMessage validations
                }

                scope.removeFn = function(){
                    var idx = scope.reward_list.indexOf(scope.obj);
                    if(idx >= 0)
                    scope.reward_list.splice(idx, 1);
                        angular.element('#reward_list reward')[idx].remove();
                }

                scope.formatDate = dateFormatService.formatDate;
            }
        }
    })
});