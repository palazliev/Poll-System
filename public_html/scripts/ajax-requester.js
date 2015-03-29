'use strict';
var ajaxRequester = (function(){
    var baseUrl = "https://api.parse.com/1/";
    var headers={
        "X-Parse-Application-Id":"ChzmI6ejz7v2bjvGhQG5SzZd31aeiHh96KH1GulJ",
        "X-Parse-REST-API-Key":"Cl3RGFsLMPxYsVPZ72HKSfALAfAFGN6wsxqz4tVC"
    };

    function getQuestions(success, error) {
        jQuery.ajax({
            method: "GET",
            headers: headers,
            url: baseUrl + "classes/Question",
            success: success,
            error: error
        });
    }

    function vote(currentQuestion, success, error){

        jQuery.ajax({
            method: "PUT",
            headers: headers,
            url: baseUrl + "classes/Question/" + currentQuestion.objectId,
            data: JSON.stringify(currentQuestion),
            success: success,
            error: error
        });
    }

    return{
        getQuestions:getQuestions,
        vote:vote
    }
})();
