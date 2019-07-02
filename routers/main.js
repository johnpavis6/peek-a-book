var express = require('express');
var app = express();

var controller = require('../controllers/main');

app.get('/',function(req,res){
    res.render('signin');
});

app.post('/signin',controller.signin);

app.get('/dashboard',function(req,res){
    res.render('dashboard');
});

module.exports = app;