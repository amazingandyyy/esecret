'use strict';

var fs = require('fs');
var uuid = require('uuid');
var path = require('path');
var moment = require('moment');

var dataFile = path.join(__dirname, '../data/messages.json');
console.log(dataFile);

// Create Dog.findAll()
exports.get = function(cb) {
    fs.readFile(dataFile, (err, data) => {
        if (err) return cb(err, null);
        try {
            var messages = JSON.parse(data);
            // console.log('messages: ', messages);
            cb(null, messages);
        } catch (err) {
            return cb(err);
        }
    });
    // then we invoke the callback
}

exports.create = function(message, cb) {
    // console.log('NewMessage: ',message);
    this.get((err, messages) => {
        if (err) return cb(err);
        var newMessage = {
            "name": message.name,
            "body": message.body,
            "time": `${moment().format('LLL')}`,
            "id": uuid()
        }
        messages.unshift(newMessage);
        fs.writeFile(dataFile, JSON.stringify(messages, null, 2), err => {
            if(err) return cb(err);
            cb(null, newMessage);
        });
    });
};
