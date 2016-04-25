'use strict';

var express = require('express');
var router = express.Router();
var Message = require('../models/message');

router.post('/', (req, res) => {
    console.log('add: ', req.body);
    Message.create(req.body, (err, message) => {
        if (err) return res.status(404).send(err);
        res.status(200).send(message);
    });
});
router.delete('/', (req, res) => {
    console.log('delete: ', req.body);
    Message.delete(req.body, (err, message) => {
        if (err) return res.status(404).send(err);
        res.status(200).send(message);
    });
});
router.put('/', (req, res) => {
    console.log('update: ', req.body);
    Message.update(req.body, (err, message) => {
        if (err) return res.status(404).send(err);
        res.send('update one successfully');
    });
});


module.exports = router;
