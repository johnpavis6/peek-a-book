let mongo = require('../models/db');
let status = require('../models/status');

exports.all = function (req, res) {
    mongo.db.collection("books").find({}).toArray((err, results) => {
        if (err) return status.error(res, { err: err });
        status.success(res, { results: results });
    })
}

exports.new = function (req, res) {
    console.log("data::", req.data);
    mongo.db.collection("books").insertOne(req.data, (err, result) => {
        if (err) return status.error(res, { err: err });
        status.success(res, { message: "Successfully added" });
    });
}