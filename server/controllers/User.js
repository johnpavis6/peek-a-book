let connection = require('../models/db').connection;
let status = require('../models/status');

exports.all = function (req, res) {
    connection.query('select * from students', function (err, results) {
        if (err) return status.error(res, { err: err });
        status.success(res, { data: results });
    });
}

exports.new = function (req, res) {
    let data = req.data;
    connection.query('insert into students set ?', data, function (err, results) {
        if (err) return status.error(res, { err: err });
        status.success(res, { message: "Student added successfully" });
    });
}