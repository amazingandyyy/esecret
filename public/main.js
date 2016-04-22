"use strict";

$(document).ready(init);


function init(){
    startingAnimation();
    $('.messageDiv').submit(messageDivSubmitted);
}

function messageDivSubmitted(e){
    e.preventDefault();
    console.log('submitted');
    var name = $('.name').val();
    var body = $('.body').val();

    $.post(`pp?name=${name}&body=${body}`)
        .done(function(data) {
            console.log('dataaaa: ', data);
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
