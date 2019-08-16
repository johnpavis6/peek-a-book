let express = require('express');
let app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.json());

let cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'peek-a-book',
    keys: ['peek-a-book']
}));

app.set('view engine', 'ejs');
app.set('views', './server/views');

app.use(express.static('./public'));
app.use('/js', express.static('./node_modules/jquery/dist/'));
app.use('/fontawesome', express.static('./node_modules/@fortawesome/fontawesome-free/'))

app.use('/api/v1', require('./routes'));
app.get('*', (req, res) => {
    res.render('dashboard');
});

let port = 5050;
let mongo = require('./models/db');
Promise.all([mongo.connect()]).then(msgs => {
    console.log(msgs)
    app.listen(port, (err) => {
        if (err) throw err;
        console.log(`App runs on http://localhost:${port}`);
    });
}).catch(err => {
    console.log(err);
});