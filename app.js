'use strict';
const PORT = process.env.PORT || 8000;
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();


var Message = require('./models/message');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));
app.set('view engine', 'jade');

app.get('/', (req, res) => {
    res.render('index', {
        title: "Welcome",
        theme: "readable"
    });
});

app.use('/board', require('./routes/board'));
// app.use('/board/message', require('./routes/message'));



app.listen(PORT, err => {
    console.log(err || `Server listening on portttt ${PORT}`);
});
