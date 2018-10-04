define([
    'main'
], function(ngModule) {
    'use strict';
    return ngModule.component("educationInput",{
        restrict: 'E',
        bindings:{
            addEducation:'&'
        },
        templateUrl: '/app/static/view/component/educationInput.html',
        controller: function($scope){
            $scope.name;
            $scope.start_date;
            $scope.end_date;    
            $scope.country;
            $scope.province;
            $scope.city;
            $scope.gpa;

            $scope.addFn = function(){
                $scope.$ctrl.addEducation({
                    education: new Education({
                            start_time:$scope.start_date,
                            end_time: $scope.end_date,
                            name: $scope.name,
                            city: $scope.city,
                            province: $scope.province,
                            country: $scope.country,
                            gpa: $scope.gpa
                        })
                });
            }
        }
    });
});