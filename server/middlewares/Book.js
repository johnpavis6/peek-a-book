function getCommonFields(req) {
    return {
        bookName: req.body.bookName,
        subjectName: req.body.subjectName,
        authorName: req.body.authorName,
    };
}
exports.create = (req, res, next) => {
    let data = getCommonFields(req);
    data.createdAt = new Date();
    req.data = data;
    next();
}
exports.update = (req, res, next) => {
    let data = getCommonFields(req);
    data._id = req.body._id;
    data.updatedAt = new Date();
    req.data = data;
    next();
}