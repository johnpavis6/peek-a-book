module.exports.signin = function(req,res){
    if(req.body.email != 'a' || req.body.password != 'a'){
        res.redirect('/');
        return;
    }
    req.session.user = 'a';
    res.redirect('/dashboard');
}

var connection = require('../db').connection;

module.exports.viewBooks = function(req,res){
    connection.query('select * from books', function (err, results) {
        console.log(results);
        res.render('books',{
            books : results
        });
    });
}

module.exports.addBook = function(req,res){
    console.log("reached add book");
    res.render('addBook',{
        code : 0
    });
}

module.exports.addBookForm = function(req,res){
    console.log(req.body);
    var data = {
        name: req.body.name,
        author: req.body.author,
        subject: req.body.subject,
        price: req.body.price,
        available : req.body.available,
    }
    connection.query('insert into books set ?', data, function (err, results) {
        res.render('addBook',{
            code : 1
        });
    });
}

module.exports.viewStudents = function(req,res){
    connection.query('select * from students', function (err, results) {
        // console.log(results);
        res.render('students',{
            students : results
        });
    });
}

module.exports.addStudent = function(req,res){
    // console.log("reached add Student");
    res.render('addStudent',{
        code : 0
    });
}

module.exports.addStudentForm = function(req,res){
    console.log(req.body);
    var data = {
        roll_no: req.body.roll_no,
        name: req.body.name,
        contact_no: req.body.contact_no,
        department: req.body.department,
        year : req.body.year,
        h_or_d : req.body.stay,
        campus: req.body.campus,
    }
    connection.query('insert into students set ?', data, function (err, results) {
        console.log("results" + results);
        if(err){
            res.render('addStudent',{
                code : 2
            }); 
            return;
        }
        res.render('addStudent',{
            code : 1
        });
    });
}

module.exports.buyBooks = function(req,res){
    // console.log("reached add Student");
    res.render('buyBooks',{
        code : 0
    });
}