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
    .controller('resumeController',function($scope, $compile, $window, $timeout){
        $scope.header = 'Basic';
        $scope.resume = new Resume();
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
        var timeout;
        


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

        $scope.$watch('resume',function(){
            // modifications in the 400ms will be updated all at once
            if(!timeout)
                timeout = $timeout(function(){
                    $scope.update();
                    timeout = null;
                },400);
            
        },true);

        // calculate right height automaticlly
        var w = angular.element($window),
            r = angular.element(document.getElementById("right")),
            frame = angular.element(document.getElementById("left")),
            cursor,
            doc,
            page_width,
            page_height,
            PROPERTIES = {
                LINEHEIGHT: 15,
                DOTRADIUS_SM: 1,
                SPACE: 6,
                FONT_S:10,
                FONT_M:20,
                FONT_L:30,
                LEFT_MARGIN: 40,
                TOP_MARGIN: 40
            };
        
        function updateRightHeight(){
            r.css("height",w.height() + "px");
        }

        w.bind('resize',function(){
            updateRightHeight();
        })

        this.$onInit = function(){
            updateRightHeight();
            $scope.update();
        }


        $scope.update = function(){
            doc = new jsPDF('p','pt');
            page_width = doc.internal.pageSize.getWidth();
            page_height = doc.internal.pageSize.getHeight();
            if(typeof doc === 'object' && doc != null && !!doc.output){
                
                cursor = new Cursor({x:PROPERTIES.LEFT_MARGIN,y:PROPERTIES.TOP_MARGIN});

                printHeader(cursor);
                printDivider(cursor);

                frame.attr('src',doc.output('datauristring'));
            }
        }

        function Cursor({x,y}){ 
            this.x = x;
            this.y = y;
        }

        /**
         * PDF Manipulation
         */

        function printHeader(cur){
            if(typeof doc === 'object' && doc != null){
                //name
                doc.setFontSize(PROPERTIES.FONT_L);
                doc.text(cur.x, cur.y, $scope.resume.basic.name);
                cur.y += PROPERTIES.LINEHEIGHT + 5;

                //email,phone
                doc.setFontSize(PROPERTIES.FONT_S);
                // doc.circle(cur.x, cur.y,PROPERTIES.DOTRADIUS_SM, 'FD');
                // doc.text(cur.x + 2 * PROPERTIES.DOTRADIUS_SM + PROPERTIES.SPACE, cur.y + 2 * PROPERTIES.DOTRADIUS_SM, $scope.resume.basic.email);

                doc.text(cur.x, cur.y, $scope.resume.basic.email);

                cur.x += doc.getStringUnitWidth($scope.resume.basic.email) * PROPERTIES.FONT_S;
                cur.x += 2 * PROPERTIES.SPACE;
                // doc.circle(cur.x, cur.y, PROPERTIES.DOTRADIUS_SM, 'FD');
                // doc.text(cur.x + 2 * PROPERTIES.DOTRADIUS_SM + PROPERTIES.SPACE, cur.y + 2 * PROPERTIES.DOTRADIUS_SM, $scope.resume.basic.phone );

                doc.text(cur.x, cur.y, $scope.resume.basic.phone);
                cur.y += PROPERTIES.LINEHEIGHT;
                
                //location
                cur.x = PROPERTIES.LEFT_MARGIN;
                doc.setFontSize(PROPERTIES.FONT_S);
                doc.text(cur.x, cur.y, $scope.resume.basic.city + ',' + $scope.resume.basic.province.toUpperCase() + ',' + $scope.resume.basic.country.toUpperCase())
                cur.y += PROPERTIES.LINEHEIGHT;
            }
        }

        function printDivider(cur){
            if(typeof doc === 'object' && doc != null){
                doc.line(PROPERTIES.LEFT_MARGIN, cur.y,page_width - PROPERTIES.LEFT_MARGIN, cur.y);
            }
        }
        

    });
});