var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost:27017');
var db = mongoose.connection;

var auth = require('./route/auth');
var routes = require('./route/route_index');



var app = express();



//Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Static Folder
app.use(express.static(__dirname + '/public'));

//Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', express.static('public'));
app.use('/auth', auth);
app.use('/', routes);




var server = app.listen(8082, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});