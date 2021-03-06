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
        
        var timeout,
            w = angular.element($window),
            r = angular.element(document.getElementById("right")),
            frame = angular.element(document.getElementById("left")),
            cursor,
            doc,
            page_width,
            page_height,
            PROPERTIES;

        $scope.header = 'Basic';
        $scope.resume = new Resume();

        $scope.$watch('resume',function(){
            // modifications in the 400ms will be updated all at once
            if(!timeout)
                timeout = $timeout(function(){
                    $scope.update();
                    timeout = null;
                },400);
            
        },true);

        // calculate right height automaticlly
        
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
            doc = new jsPDF('p','pt').setProperties({
                title:"Resume"
            });
            page_width = doc.internal.pageSize.getWidth();
            page_height = doc.internal.pageSize.getHeight();
            PROPERTIES = {
                DOTRADIUS_S: 4,
                SPACE: 6,
                FONT_S:10,
                FONT_M:20,
                FONT_L:30,
                LEFT_MARGIN: 40,
                TOP_MARGIN: 40,
                LINEHEIGHT: doc.internal.getLineHeight()
            };
            if(typeof doc === 'object' && doc != null && !!doc.output){
                
                cursor = new Cursor({x:PROPERTIES.LEFT_MARGIN,y:PROPERTIES.TOP_MARGIN});

                renderTemplateOne(cursor);
                
                frame.attr('src',doc.output('datauristring'));
            }
        }

        function renderTemplateOne(cursor){
            printHeader(cursor);
            printDivider(cursor);
            printEducation(cursor);
            printDivider(cursor);
            printSkills(cursor);
            printDivider(cursor);
            printProjects(cursor);
            printDivider(cursor);
            printRewards(cursor);
        }

        function Cursor({x,y}){ 
            this.x = x;
            this.y = y;
        }

        /**
         * PDF Manipulation
         */

        function textWithCheck(doc, x, y, text){
            if(typeof doc === 'object' && doc != null){
                if(Object.prototype.toString.call(text) === '[object Array]'){
                    text.forEach(item => {
                        y = checkNewPage(y);
                        doc.text(x,y,item);
                        y += PROPERTIES.LINEHEIGHT;
                    })
                    y -= PROPERTIES.LINEHEIGHT;
                } else {
                    y = checkNewPage(y);
                    doc.text(x,y,text);
                }
            }
        }

        function printHeader(cur){
            if(typeof doc === 'object' && doc != null){
                //name
                doc.setFontSize(PROPERTIES.FONT_L);
                textWithCheck(doc, cur.x, cur.y, $scope.resume.basic.name || " ");
                cur.y += PROPERTIES.LINEHEIGHT + 5;

                //email,phone
                doc.setFontSize(PROPERTIES.FONT_S);
                // doc.circle(cur.x, cur.y,PROPERTIES.DOTRADIUS_S, 'FD');
                // textWithCheck(doc, cur.x + 2 * PROPERTIES.DOTRADIUS_S + PROPERTIES.SPACE, cur.y + 2 * PROPERTIES.DOTRADIUS_S, $scope.resume.basic.email);

                textWithCheck(doc, cur.x, cur.y, $scope.resume.basic.email || " ");

                cur.x += doc.getTextWidth($scope.resume.basic.email);
                cur.x += 2 * PROPERTIES.SPACE;
                // doc.circle(cur.x, cur.y, PROPERTIES.DOTRADIUS_S, 'FD');
                // textWithCheck(doc, cur.x + 2 * PROPERTIES.DOTRADIUS_S + PROPERTIES.SPACE, cur.y + 2 * PROPERTIES.DOTRADIUS_S, $scope.resume.basic.phone );

                textWithCheck(doc, cur.x, cur.y, $scope.resume.basic.phone || " ");
                cur.y += PROPERTIES.LINEHEIGHT;
                
                //location
                cur.x = PROPERTIES.LEFT_MARGIN;
                doc.setFontSize(PROPERTIES.FONT_S);
                textWithCheck(doc, cur.x, cur.y, ($scope.resume.basic.city + ',' + $scope.resume.basic.province.toUpperCase() + ',' + $scope.resume.basic.country.toUpperCase()) || " ")
                cur.y += PROPERTIES.LINEHEIGHT;
            }
        }

        function printDivider(cur){
            if(typeof doc === 'object' && doc != null){
                doc.line(PROPERTIES.LEFT_MARGIN, cur.y,page_width - PROPERTIES.LEFT_MARGIN, cur.y);
                cur.y += PROPERTIES.LINEHEIGHT;
            }
        }

        function checkNewPage(y){
            if(typeof doc === 'object' && doc != null){
                if(y >= page_height - 2 * PROPERTIES.TOP_MARGIN){
                    doc.addPage();
                    cursor.y = PROPERTIES.TOP_MARGIN;
                    return cursor.y;
                }
                return y;
            }
        }

        function printEducation(cur){
            if(typeof doc === 'object' && doc != null){
                //title
                doc.setFontSize(PROPERTIES.FONT_S).setFontStyle('bold');
                textWithCheck(doc, cur.x, cur.y, "EDUCATION");
                cur.y += PROPERTIES.LINEHEIGHT;

                //education list
                
                $scope.resume.education_list.forEach(education => {
                    doc.setFontStyle('bold');
                    textWithCheck(doc, cur.x, cur.y, education.name || " ");
                    if(education.gpa){
                        var gpa = " (GPA:" + education.gpa + ")"
                        textWithCheck(doc, cur.x + doc.getTextWidth(education.name || ""), cur.y, gpa);
                    }
                    doc.setFontStyle('normal');
                    var date = education.start_date + '-' + education.end_date;
                    var title = education.name;
                    if(education.city)
                        title += ',' + education.city;
                    if(education.province)
                        title += ',' + education.province;
                    if(education.country)
                        title += ',' + education.country;

                    textWithCheck(doc, page_width - doc.getTextWidth(date) - PROPERTIES.LEFT_MARGIN, cur.y, date || " ");
                    cur.y += PROPERTIES.LINEHEIGHT;

                    

                    textWithCheck(doc, cur.x + PROPERTIES.SPACE, cur.y, title || " ");
                    cur.y += PROPERTIES.LINEHEIGHT;
                });
            }
        }
        
        function printSkills(cur){
            if(typeof doc === 'object' && doc != null){
                //title
                doc.setFontSize(PROPERTIES.FONT_S).setFontStyle('bold');
                textWithCheck(doc, cur.x, cur.y, "SKILL");
                cur.y += PROPERTIES.LINEHEIGHT;
                doc.setFontSize(PROPERTIES.FONT_S).setFontStyle('normal');

                $scope.resume.skill_group.forEach(skill => {
                    cur.x = PROPERTIES.LEFT_MARGIN;
                    if(skill.category){
                        textWithCheck(doc, cur.x, cur.y, skill.category + ":");
                        cur.x += doc.getTextWidth(skill.category + ":") + PROPERTIES.SPACE;
                    }
                    var skills = doc.splitTextToSize(skill.skills,page_width - PROPERTIES.LEFT_MARGIN * 2 - cur.x);

                    textWithCheck(doc, cur.x, cur.y, skills);
                    cur.y += PROPERTIES.LINEHEIGHT * skills.length;
                })
            }
        }

        function printProjects(cur){
            if(typeof doc === 'object' && doc != null){
                //title
                doc.setFontSize(PROPERTIES.FONT_S).setFontStyle('bold');
                textWithCheck(doc, cur.x, cur.y, "PROJECT");
                cur.y += PROPERTIES.LINEHEIGHT;
                
                
                $scope.resume.projects.forEach(project => {
                    cur.x = PROPERTIES.LEFT_MARGIN;
                    doc.setFontStyle('bolditalic');

                    textWithCheck(doc, cur.x, cur.y, project.title);
                    doc.setFontStyle('normal');
                    // date
                    var date = project.start_date + '-' + project.end_date;
                    textWithCheck(doc, page_width - PROPERTIES.LEFT_MARGIN - doc.getTextWidth(date), cur.y, date);
                    cur.y += PROPERTIES.LINEHEIGHT;
                    
                    // organization
                    if(project.organization){
                        doc.setFontStyle('bold');
                        var organization = "Organization: ";
                        textWithCheck(doc, cur.x, cur.y, organization);
                        doc.setFontStyle('normal');
                        textWithCheck(doc, cur.x + doc.getTextWidth(organization) + PROPERTIES.SPACE, cur.y, project.organization);
                        cur.y += PROPERTIES.LINEHEIGHT;
                    }
                    
                    // summary
                    doc.setFontStyle('bold');
                    var summary = "Summary:"
                    textWithCheck(doc, cur.x, cur.y, summary);
                    doc.setFontStyle('normal');
                    var lines = doc.splitTextToSize(project.summary,page_width - PROPERTIES.LEFT_MARGIN * 2 - doc.getTextWidth(summary) - PROPERTIES.SPACE);

                    textWithCheck(doc, cur.x + doc.getTextWidth(summary) + PROPERTIES.SPACE, cur.y, lines);
                    cur.y += PROPERTIES.LINEHEIGHT * lines.length;

                    // related skills
                    if(project.related_skills){
                        doc.setFontStyle('bold');
                        textWithCheck(doc, cur.x, cur.y, "Related skills:");
                        doc.setFontStyle('normal');
                        var skills = doc.splitTextToSize(project.related_skills,page_width - PROPERTIES.LEFT_MARGIN * 2 - doc.getTextWidth("Related skills:") - PROPERTIES.SPACE);

                        textWithCheck(doc, cur.x + doc.getTextWidth("Related skills: ") + PROPERTIES.SPACE, cur.y, skills);
                        cur.y += PROPERTIES.LINEHEIGHT * skills.length;
                    }

                    // responsibility
                    doc.setFontStyle('bold');
                    var responsibility = "Responsibility:"
                    textWithCheck(doc, cur.x, cur.y, responsibility);
                    doc.setFontStyle('normal');
                    lines = doc.splitTextToSize(project.responsibility,page_width - PROPERTIES.LEFT_MARGIN * 2 - doc.getTextWidth(responsibility) - PROPERTIES.SPACE);

                    textWithCheck(doc, cur.x + doc.getTextWidth(responsibility + " ") + PROPERTIES.SPACE, cur.y, lines);
                    cur.y += PROPERTIES.LINEHEIGHT * lines.length;

                })

            }
        }

        function printRewards(cur){
            if(typeof doc === 'object' && doc != null){
                // title
                doc.setFontSize(PROPERTIES.FONT_S).setFontStyle('bold');
                textWithCheck(doc, cur.x, cur.y, 'REWARD');
                cur.y += PROPERTIES.LINEHEIGHT;

                $scope.resume.rewards.forEach(reward => {
                    // reward title
                    doc.setFontStyle('bold');
                    textWithCheck(doc, cur.x, cur.y, reward.title);

                    doc.setFontStyle('normal');
                    var text = reward.organization + ', ' + reward.time;
                    textWithCheck(doc, page_width - PROPERTIES.LEFT_MARGIN - doc.getTextWidth(text), cur.y, text);
                    cur.y += PROPERTIES.LINEHEIGHT;
                })
            }
        }

    });
});