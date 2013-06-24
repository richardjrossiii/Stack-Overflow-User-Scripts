// ==UserScript==
// @name          SOAnswerDate
// @include       http://stackoverflow.com/users*
// @include       http://*.stackoverflow.com/users*
// @include       http://*.stackexchange.com/users*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version       1.0
// ==/UserScript==

function url_domain(data) {
  var    a      = document.createElement('a');
         a.href = data;
  return a.hostname;
}

function formatDate(date) {
    var monthStrs = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    var hour = date.getHours();
    var minute = date.getMinutes();

    return monthStrs[month] + ' ' + day + ' \'' + (year % 100) + ' at ' + hour + ':' + minute;
}

var answers = $('.user-answers .answer-summary');
var answerIds = [];

var answerLinks = {};

$(answers).each(function(i, answer) {
     // in the form of /questions/id/{metadata}
     var answerLink = $(answer);
     var answerId = answerLink.find('.answer-link a').attr('href').split('#')[1];

     answerLinks[answerId] = answerLink;
     answerIds.push(answerId);
});

var domain = url_domain(window.location);

if (answerIds.length) {
    // call the SO api
    var apiUrl = 'http://api.stackexchange.com/2.1/answers/';
    apiUrl += answerIds.join(';');
    apiUrl += '?filter=!3zv0S-zw(-deW8S_S&site=' + domain;

    $.ajax(apiUrl).done(function(response) {
         var answers = response['items'];

         for (var index = 0; index < answers.length; index++) {
             // get the answer link for this answer
             var answerLink = answerLinks[answers[index].answer_id];

             // create the label
             var creationDate = new Date(answers[index].creation_date * 1000);
             var label = "<span style='float: right; padding-top: 6px;'>answered " +  formatDate(creationDate) + "</span>";

             answerLink.append(label);
         }
    });
}