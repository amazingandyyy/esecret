'use strict';

const PORT = process.env.PORT || 8000;

// require libraries
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var uuid = require('uuid');
// var jade = require('jade');  we don't need to require jade here

// require my dog modules
var Message = require('./modules/message');

// add declaration
var app = express();

//app.use use a middileway function!!!
// use morgan
app.use(morgan('common'));
// body parser give req a new key
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.set('view engine', 'jade');

app.get('/', (req, res, next) => {
    res.render('index', {
        title: "Welcome",
        theme: "readable"
    });
});
app.get('/board', (req, res, next) => {
    Message.get((err,messages)=>{
        // console.log("messages2: ", messages);
        if(err)return res.status(404).send('cannot find the messages');
        res.render('board', {
            title: "Board",
            theme: "readable",
            active: "active",
            messages: messages
        });
    });
});
app.post('/post', (req, res, next) => {
    console.log('req.body: ',req.body);
    // console.log('req.query: ',req.query);
    // console.log('req: ',req);
    // console.log('req: ',req);
    Message.create(req.body,(err, message)=>{
        res.status(err ? 400 : 200).send(err || req.body);
    });

});


//  404 handler
app.use((req, res, next) => {
    res.status(404).send("NOT DOUNDDDD")
})


// create the server
app.listen(PORT, err => {
    console.log(err || `Server lisitening on portttt ${PORT}`);
});
