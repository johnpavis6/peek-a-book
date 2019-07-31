exports.new = function (req, res) {
    let data = {
        name: req.body.name,
        author: req.body.author,
        subject: req.body.subject,
        price: req.body.price,
        available: req.body.available,
    }
    req.body = {};
    req.data = data;
    next();
}