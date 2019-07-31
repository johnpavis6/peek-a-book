let status = require('../models/status');
let connection = require('../models/db').connection;

exports.all = function (req, res) {
    connection.query('select * from books', function (err, results) {
        if (err) return status.error(res, { err: err });
        status.success(res, { data: results });
    });
}
exports.new = function (req, res) {
    let data = req.data;
    connection.query('insert into books set ?', data, function (err, results) {
        if (err) return status.error(res, { err: err });
        status.success(res, { message: "Book added successfully" });
    });
}