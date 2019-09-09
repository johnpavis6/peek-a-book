import { toastr } from 'react-redux-toastr';
exports.notify = function (type, title, message, options) {
    toastr[type || 'info'](title || '', message || '', options || { transitionIn: 'bounceInDown', transitionOut: 'bounceOutUp' });
}
exports.confirm = function (message, onOk) {
    toastr.confirm(message, { onOk: onOk || function () { } });
}