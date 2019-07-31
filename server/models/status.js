exports.success = (res, body = {}) => {
    res.json({ status: body.status || 1, code: body.code || 200, message: body.message || "Success", data: body.data || {} });
}
exports.error = (res, body = {}) => {
    res.json({ status: body.status || 0, code: body.code || 500, err: body.err || "Error", data: body.data || {} });
}