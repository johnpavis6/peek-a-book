let express = require('express');
let app = express.Router();

let User = require('./controllers/User');
let Book = require('./controllers/Book');

app.get('/users/list', User.all);
app.post('/users/new', User.new);

app.get('/books/list', Book.all);
app.post('/books/new', Book.new);

module.exports = app;