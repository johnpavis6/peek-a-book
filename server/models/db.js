const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'peek-a-book';

exports.connect = function () {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
            if (err) return reject(err);
            resolve("connected to mongo db");
            exports.db = client.db(dbName);
        });
    })
}
exports.ObjectId = function (_id) { return new mongodb.ObjectID(_id) };
