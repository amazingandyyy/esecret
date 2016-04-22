"use strict";

$(document).ready(init);

var moment = require('moment');

function init(){
    startingAnimation();
    $('.messageDiv').submit(messageDivSubmitted);
}

function messageDivSubmitted(e){
    e.preventDefault();
    console.log('submitted');
    var name = $('.name').val();
    var body = $('.body').val();

    $.post(`/post`, {name: name, body: body})
        .done(function(data) {
            console.log(data);
            var name = data.name;
            var body = data.body;
            var time = moment().format('LLL');
            var newMessage = $('.row.template.newMessage').clone();
            newMessage.removeClass('template');
            newMessage.find('.name').text(name);
            newMessage.find('.body').text(body);
            newMessage.find('.timeStamp').text(time);

            $('.messageContainer').prepend(newMessage);
            $('form.messageInputForm textarea').val('');

        })
        .fail(function(err) {
            console.log('err: ', err);
        });

}

function startingAnimation() {
    var intro = $('.intro')
    setTimeout(function() {
        $('.jumbotron').css('display', 'block').addClass('animated fadeIn');
        $('.intro').css('display', 'block').addClass('animated bounceIn');
    }, 100)



}
