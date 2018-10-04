define([
    // include ngmodule
    'main',
], function(ngModule) {
    return ngModule
    .config(function($mdThemingProvider) {
        // Configure a dark theme with primary foreground yellow
        $mdThemingProvider.theme('docs-dark', 'default')
          .primaryPalette('green');
        //   .dark();
    
    })
    .controller('resumeController',function($scope, $compile){
        $scope.header = 'Basic';
        $scope.obj = new Resume();
        $scope.countries = ['USA','CHINA','FRANCE','CANADA'];
        $scope.places = {
            'USA': {
                'California':[
                    'Los Angeles',
                    'Irvine',
                    'San Diego'
                ],
                'TE':[
                    'Houston',
                    'San Antonio'
                ]
            },
            'CANADA':{
                'Ontario':[
                    'Toronto',
                    'Ottawa',
                    'Windsow'
                ],
                'Qubec':[
                    'Montreal',
                    'Qubec City'
                ]
            },
            'CHINA':{
                'Shanghai':[
                    'Shanghai'
                ],
                'Liaoning':[
                    'Shenyang',
                    'Benxi'
                ]
            }

        };
        $scope.countryTerm = "";
        $scope.provinceTerm = "";
        $scope.cityTerm = "";
        $scope.selected_country = "";
        $scope.selected_province = "";
        $scope.selected_city = "";

        $scope.getCountries = function(){
            return Object.keys($scope.places);
        }
        $scope.getProvinces = function(){
            if($scope.selected_country != "")
                return Object.keys($scope.places[$scope.selected_country]);
            return null;
        }
        $scope.getCities = function(){
            if($scope.selected_country != "" && $scope.selected_province != "")
                return $scope.places[$scope.selected_country][$scope.selected_province];
            return null;
        }

        $scope.$watch('selected_country',function(){
            $scope.selected_province = "";
            $scope.selected_city = "";
        });

        $scope.$watch('selected_province',function(){
            $scope.selected_city = "";
        });

        $scope.addEducation = function(education){
            $scope.obj.education_list.push(education);
            angular.element("#education_list").append($compile(`<education-input addEducation="addEducation(education)"></education-input>`)($scope.$new(true)))
        }


    });
});