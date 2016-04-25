'use strict';

var express = require('express');
var router = express.Router();
var Message = require('../models/message');


router.get('/', (req, res, next) => {
    Message.getAll((err, messages) => {
        // console.log("messages2: ", messages);
        if (err) return res.status(404).send(err);
        var messages = messages.reverse();
        // console.log(messages);
        res.render('board', {
            title: "Board",
            theme: "readable",
            active: "active",
            messages: messages
        });
    });
});

router.use('/message', require('./message'));
// router.use('/delete', require('./delete'));
// router.use('/update', require('./update'));
// router.use('/find', require('./find'));

module.exports = router;
