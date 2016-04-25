"use strict";

$(document).ready(init);

function init() {
    startingAnimation();
    $('.messageDiv').not('.editterForm').submit(messageDivSubmitted);
    $('.messageContainer').on('click', '.delete', deleteOne);
    $('.messageContainer').on('click', '.edit', editOne);
    $('.editterForm').submit(editterFormSubmit);
}
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function messageDivSubmitted(e) {
    var id = guid();
    var timeStamp = moment().format('LLL');
    // console.log('id: ', id);
    // console.log('time: ', timeStamp);
    e.preventDefault();
    console.log('submitted');
    var name = $('.name').val();
    var body = $('.body').val();

    $.ajax({
            url: '/board/message/',
            method: 'POST',
            data: {
                name: name,
                body: body,
                time: timeStamp,
                id:id
            }
        })
        .done(function(data) {
            console.log('data: ', data);
            console.log('ddd');
            var name = data.name;
            var body = data.body;
            var time = data.time;
            var id = data.id;

            // var time = moment().format('LLL');
            var newMessage = $('.row.template.newMessage').clone().addClass('animated bounceIn');
            newMessage.removeClass('template');
            newMessage.find('.name').text(name);
            newMessage.find('.body').text(body);
            newMessage.find('.time').text(time);
            newMessage.attr('data-id', id);
            newMessage.find('.delete').attr('data-id', id);
            newMessage.find('.edit').attr('data-id', id);
            newMessage.find('.messageDiv').attr('data-id', id);


            // newMessage.find('.timeStamp').text(time);

            $('.messageContainer').prepend(newMessage);

            $('form.messageInputForm textarea').val('');

        })
        .fail(function(err) {
            console.log('err: ', err);
        });
}

function deleteOne(e) {
    var id = $(e.target).attr('data-id');
    console.log('id delete clicked: ', id);

    $.ajax({
            url: '/board/message/',
            method: 'DELETE',
            data: {
                id: id,
            }
        })
        .done(function(data) {
            console.log('id has been deleted for sure: ', data.id);
            $(`.messageContainer .row[data-id='${data.id}']`).addClass('animated hinge');
            setTimeout(function(){
                $(`.messageContainer .row[data-id='${data.id}']`).remove();
            },1000);
        })
        .fail(function(err) {
            console.log('err: ', err);
        });
}


function editOne(e) {
    e.preventDefault();
    var id = $(e.target).attr('data-id');
    var editter = $('.editterDiv');
    editter.fadeIn(100).css('display', 'inline-block');
    editter.find('.container').addClass('animated bounceIn');
    editter.find('button').attr('data-id', id);

    // var parent = $(`.messageDiv[data-id='${id}']`);
    // console.log('parent: ', parent);
    // console.log('id: ', id);
    var body = $(`.row [data-id='${id}']`).find('.panel-body span').text();
    var name = $(`.row [data-id='${id}']`).find('.panel-footer span').first().text();
    // console.log('parent2: ', parent2);
    console.log('name: ', name);
    console.log('body: ', body);
    editter.find('.name').val(name);
    editter.find('.body').val(body);
}

function editterFormSubmit() {
    var editter = $('.editterDiv');
    var name = editter.find('.name').val();
    var body = editter.find('.body').val();
    var id = editter.find('button').attr('data-id');
    console.log('name: ', name, 'body: ', body);
    var timeStamp = moment().format('LLL');

    $.ajax({
            url: '/board/message/',
            method: 'PUT',
            data: {
                name: name,
                body: body,
                time: timeStamp,
                id: id
            }
        })
        .done(function(data) {
            editter.fadeOut(100).css('display', 'none');
            editter.find('.container').removeClass('animated bounceIn');
            editter.find('button').attr('data-id', '');
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
