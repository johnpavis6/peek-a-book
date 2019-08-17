function getCommonFields(req) {
    return {
        rollNo: req.body.rollNo,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        department: req.body.department,
        year: req.body.year,
        stayType: req.body.stayType,
        campus: req.body.campus,
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