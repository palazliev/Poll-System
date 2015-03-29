'use strict';
(function() {
    showQuestionsView();

    function showQuestionsView() {
        $("#results").remove();
        sum[0]=0;
        ajaxRequester.getQuestions(loadQuestionsSuccess, loadQuestionError);
    }

    function loadQuestionsSuccess(data) {

        for (var q in data.results) {
            var $questions=$("<ul>");
            $questions.attr("id","questions");
            $("main").append($questions);
            var question = data.results[q];
            questionsData[question.objectId]=question;
            var $questionLi = $("<li>");
            $questionLi.attr("name",question.objectId);
            $questionLi.data("question", question);

            var $title = $("<div>");
            $questionLi.append($title);
            $title.text(question.questionText);

            var $questionForm=$("<form>");
            var answers=question.answers;
            for (var a in answers){
                var $input=$("<input>");
                $input.attr({type:"radio", name:question.objectId, id: a, value:a});
                var $label=$("<label>");
                $label.attr({for:a});
                $label.text(a);

                $questionForm.append($input);
                $questionForm.append($label);
                $questionForm.append("<br>");
            }

            var $button=$("<button>");
            $button.attr({id:"voteButton", name: question.objectId});
            $button.text("Vote");
            $questionLi.append($questionForm);
            $questionLi.append($button);
            $("#questions").append($questionLi);
            $("#questions").show();
        }
        $(function() {
            $("button").click(vote);

        });
    }
    function vote(){
        var currentLi = $(this).parent();
        var currentLiName=$(currentLi).attr("name");
        var input='input[name='+currentLiName+']:radio:checked';
        radioValue[0] = $(input).val();
        currentQuestion[0]=questionsData[currentLiName];
        currentQuestion[0].answers[radioValue]+=1;
        totalSum();
        function totalSum(){
            for(var b in currentQuestion[0].answers){
                sum[0]+=currentQuestion[0].answers[b];
            }
        }
        ajaxRequester.vote(currentQuestion[0], voteSuccess, voteError);
    }

    function voteSuccess(data){
        showVotingResults();
    }
    function voteError(error){
        showErrorMessage("Error");
    }

    function showVotingResults(){
        $("#questions").remove();
        var $results=$("<div>");
        $results.attr("id","results");

        var $answersUl=$("<ul>");
        var $questionTitle = $("<div>");
        $questionTitle.text(currentQuestion[0].questionText);

        for (var answer in currentQuestion[0].answers){
            var $answerLi=$("<li>");

            var $answerTitle=$("<div>");
            $answerTitle.attr("class","answer");
            $answerTitle.text(answer);

            var $backButton=$("<button>");
            $backButton.attr("id", "backButton");
            $backButton.text("Back to Polls");

            var $percents=$("<div>");
            $percents.attr({
                class:"percents",
                style:function(){
                    var part = (currentQuestion[0].answers[answer]/sum)*100;
                    var width="width:"+part+"%";
                    return width;
                }
            });
            $percents.text(currentQuestion[0].answers[answer]);

            $answerLi.append($answerTitle);
            $answerLi.append($percents);
            $answersUl.append($answerLi);
        }
        $($results).append($questionTitle);
        $($results).append($answersUl);
        $($results).append($backButton);
        $("main").append($results);
        $($results).show();
        $($backButton).click(showQuestionsView);
    }


    function loadQuestionError(error){
        showErrorMessage("Loading questions failed.")
    }

    function showErrorMessage(msg){
        noty({
            text:msg,
            type:"error",
            layout:"topCenter",
            timeout:5000
        });
    }

    function showSuccessMessage(msg){
        noty({
            text:msg,
            type:"success",
            layout:"topCenter",
            timeout:5000
        });
    }
})();