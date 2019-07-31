exports.new = (req, res, next) => {
    let data = {
        roll_no: req.body.roll_no,
        name: req.body.name,
        contact_no: req.body.contact_no,
        department: req.body.department,
        year: req.body.year,
        h_or_d: req.body.stay,
        campus: req.body.campus,
    };
    req.body = {};
    req.data = data;
    next();
}