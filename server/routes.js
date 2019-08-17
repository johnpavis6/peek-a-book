let express = require('express');
let app = express.Router();

let UserController = require('./controllers/User');
let BookController = require('./controllers/Book');
let UserMiddleware = require('./middlewares/User');
let BookMiddleware = require('./middlewares/Book');

app.get('/users/all', UserController.get);
app.post('/user', UserMiddleware.create, UserController.create);
app.put('/user', UserMiddleware.update, UserController.update);

app.get('/books/all', BookController.get);
app.post('/book', BookMiddleware.create, BookController.create);
app.put('/book', BookMiddleware.update, BookController.update);

module.exports = app;