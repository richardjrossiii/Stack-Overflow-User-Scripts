// ==UserScript==
// @name          SOTimeline
// @description   Adds a 'timeline' link to stack overflow posts
// @include       http://stackoverflow.com/*
// @include       http://*.stackoverflow.com/*
// @include       http://*.stackexchange.com/*
// @require       http://code.jquery.com/jquery-2.0.0.min.js
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