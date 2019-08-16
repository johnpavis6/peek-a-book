exports.new = function (req, res) {
    let data = {
        bookName: req.body.bookName,
        subjectName: req.body.subjectName,
        authorName: req.body.authorName,
        createdAt: new Date()
    }
    req.body = {};
    req.data = data;
    next();
}