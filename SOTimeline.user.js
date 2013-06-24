// ==UserScript==
// @name          SOTimeline
// @description   Adds a 'timeline' link to stack overflow posts
// @include       http://stackoverflow.com/*
// @include       http://*.stackoverflow.com/*
// @include       http://*.stackexchange.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version       1.0
// ==/UserScript==

var postMenu = $('.question .post-menu');

if (postMenu) {
    var editLink = postMenu.find('.edit-post');
    var postId = editLink.attr('href').split('/')[2];

    // add a timeline link
    postMenu.append('<span class="lsep">|</span>');
    postMenu.append('<a href="/posts/' + postId + '/timeline">timeline</a>');
}