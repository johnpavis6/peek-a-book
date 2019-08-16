exports.success = (res, body = {}) => {
    res.json({
        status: body.status || 1, code: body.code || 200, message: body.message || "Success", results: body.results || []
    });
}
exports.error = (res, body = {}) => {
    res.json({
        status: body.status || 0, code: body.code || 500, err: body.err || "Error", results: body.results || []
    });
}