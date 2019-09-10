import validator from 'validator';

exports.isEmail = function (val) {
    let errors = isEmpty(val);
    if (!val || !validator.isEmail(val)) errors.push("This field should be in email format")
    return errors;
}

exports.isPhone = function (val) {
    let errors = isEmpty(val);
    if (!val || !validator.isPhone(val)) errors.push("This field should be in phone format")
    return errors;
}

exports.isEmpty = function (val) {
    return (!val) ? ["This field is required"] : [];
}