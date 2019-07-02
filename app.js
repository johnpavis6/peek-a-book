var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var session = require('express-session');

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./node_modules/jquery/dist'));
app.use(express.static('./node_modules/bootstrap/dist/'));
app.use(express.static('./node_modules/angular/'));
app.use(express.static('./public/'));

app.use('/', require('./routers/main'));
app.use('/dashboard', require('./routers/dashboard'));

app.listen(8082, function (err) {
    if (err) { throw err; }
    console.log('App runs on http://localhost:8082')
});