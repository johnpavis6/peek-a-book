exports.new = (req, res, next) => {
    let data = {
        rollNo: req.body.rollNo,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        department: req.body.department,
        year: req.body.year,
        stayType: req.body.stayType,
        campus: req.body.campus,
        createdAt: new Date()
    };
    req.body = {};
    req.data = data;
    next();
}