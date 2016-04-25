'use strict';

var fs = require('fs');

var db = require('../config/db');
var moment = require('moment');
var path = require('path');
var timeStamp = moment().format('LLL');

var dataFile = path.join(__dirname, '../data/message.json');
console.log('dataFile: ',dataFile);

exports.getAll = function(cb) {
    fs.readFile(dataFile, (err, data) => {
        if (err) return cb(err, null);
        try {
            var messages = JSON.parse(data);
            // console.log('messages: ', messages);
            cb(null, messages);
            console.log(messages);
        } catch (err) {
            return cb('err: ', err);
        }
    });
};

exports.create = function(message, cb) {
    this.getAll((err, messages) => {
        if (err) return cb(err);
        var newMessage = {
            "name": message.name,
            "body": message.body,
            "time": message.time,
            "id": message.id
        }
        messages.unshift(newMessage);
        fs.writeFile(dataFile, JSON.stringify(messages, null, 2), err => {
            if (err) return cb(err);
            cb(null, newMessage);
        });
    });
};

exports.delete = function(message, cb) {
    this.getAll((err, messages) => {
        if (err) return cb(err);
        console.log(messages);
        var newMessages = messages.filter((e)=>{
            return e.id !== message.id;
        });
        fs.writeFile(dataFile, JSON.stringify(newMessages, null, 2), err => {
            if (err) return cb(err);
            cb(null, message);
        });
    });
};

exports.update = function(message, cb) {
    this.getAll((err, messages) => {
        if (err) return cb(err);
        var id = message.id;
        var index = messages.map((e)=>{
            return e.id;
        }).indexOf(id);
        var newMessage = {
            "name": message.name,
            "body": message.body,
            "time": message.time,
            "id": message.id
        }
        messages.splice(index, 1, newMessage);
        fs.writeFile(dataFile, JSON.stringify(messages, null, 2), err => {
            if (err) return cb(err);
            cb(null, message.id);
        });
    });
};
