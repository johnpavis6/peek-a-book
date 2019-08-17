let mongo = require('../models/db');

exports.get = function (req, res) {
    mongo.db.collection("books").find({}).toArray((err, results) => {
        if (err) return res.status(500).json({ message: err.message, err: err });
        res.json({ message: "Get success", results: results });
    })
}

exports.create = function (req, res) {
    mongo.db.collection("books").insertOne(req.data, (err, results) => {
        if (err) return res.status(500).json({ message: err.message, err: err });
        res.json({ message: "Create success", results: results });
    });
}

exports.update = function (req, res) {
    let query = { _id: mongo.ObjectId(req.data._id) };
    delete req.data._id;
    let data = { $set: req.data };
    mongo.db.collection("books").updateOne(query, data, (err, results) => {
        if (err) return res.status(500).json({ message: err.message, err: err });
        res.json({ message: "Update success", results: results });
    });
}

exports.delete = function (req, res) {
    let query = { _id: mongo.ObjectId(req.params._id) };
    mongo.db.collection("books").deleteOne(query, (err, results) => {
        if (err) return res.status(500).json({ message: err.message, err: err });
        res.json({ message: "Delete success", results: results });
    });
}