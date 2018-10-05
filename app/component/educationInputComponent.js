define([
    'main',
], function(ngModule) {
    'use strict';
    return ngModule.component("educationInput",{
        restrict: 'E',
        bindings:{
            addEducation: '&',
            removeEducation:'&',
            education:'='
        },
        templateUrl: '/app/static/view/component/educationInput.html',
        controller: function($scope, $compile){
            $scope.name;
            $scope.start_date;
            $scope.end_date;    
            $scope.country;
            $scope.province;
            $scope.city;
            $scope.gpa;
            $scope.obj;
            $scope.isenabled = true;

            // $scope.addFn = function(){
            //     $scope.$ctrl.addEducation({
            //         education: new Education({
            //                 start_time:$scope.start_date,
            //                 end_time: $scope.end_date,
            //                 name: $scope.name,
            //                 city: $scope.city,
            //                 province: $scope.province,
            //                 country: $scope.country,
            //                 gpa: $scope.gpa
            //             })
            //     });
            //     $scope.isenabled = false;
            // }

            $scope.addFn = function(){
                $scope.obj = new Education({
                    start_time:$scope.start_date,
                    end_time: $scope.end_date,
                    name: $scope.name,
                    city: $scope.city,
                    province: $scope.province,
                    country: $scope.country,
                    gpa: $scope.gpa
                });
                $scope.$ctrl.education.push($scope.obj);
                $scope.isenabled = false;
                $scope.$ctrl.addEducation();
            }

            $scope.removeFn = function(){
                var idx = $scope.$ctrl.education.indexOf($scope.obj);
                if(idx >= 0)
                    $scope.$ctrl.education.splice(idx, 1);
                    angular.element('#education_list education-input')[idx].remove();
            }

        }
    });
});