let express = require('express');
let app = express.Router();

let UserController = require('./controllers/User');
let BookController = require('./controllers/Book');
let UserMiddleware = require('./middlewares/User');
let BookMiddleware = require('./middlewares/Book');

app.get('/users/list', UserController.all);
app.post('/users/new', UserMiddleware.new, UserController.new);

app.get('/books/list', BookController.all);
app.post('/books/new', BookMiddleware.new, BookController.new);

module.exports = app;