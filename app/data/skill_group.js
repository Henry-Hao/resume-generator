function skill_group({title=""}){

    /**
     * eg.
     * 1.  * Programming Skills: Java, Python, C,  JavaScript
     *     * Databases: MySQL, SQLServer, MongoDB
     *     * Languages: English, Chineses, French
     * 
     * 
     * 2.  * Fluent English both written and conversational
     *     * Technical Sklils: Web-Development, Database, Linux, Machine Learning
     *  
     */

    this.title = title;
    this.skills = new hashset();// can be empty

    this.addSkills = function(skills){
        skills.split(',').forEach(function(index, value){
            this.skills.add(value);    
        })
    }

}