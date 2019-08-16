const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'peek-a-book';

exports.connect = () => {
    return new Promise((resolve, reject) => {
        console.log("connection requested to mongo db");
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
            if (err) return reject(err);
            resolve("connected to mongo db");
            exports.db = client.db(dbName);
        });
    })
}