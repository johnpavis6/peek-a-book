var express = require('express');
var app = express();

var controller = require('../controllers/main');

app.get('/viewBooks',controller.viewBooks);

app.get('/addBook',controller.addBook);

app.post('/addBookForm',controller.addBookForm);

app.get('/viewStudents',controller.viewStudents);

app.get('/addStudent',controller.addStudent);

app.post('/addstudentForm',controller.addStudentForm); 

app.get('/buyBooks',controller.buyBooks);

module.exports = app;