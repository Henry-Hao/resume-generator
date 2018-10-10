define([
    'main',
], function(ngModule) {
    'use strict';
    return ngModule.service('dateFormatService', function(){
        return {
            formatDate: function(date) {
                if(date != null && date != undefined && date != "")
                    return new Date(date).toISOString().substring(0,7).replace('-','.');
                return "";
            }
        }
    })
});