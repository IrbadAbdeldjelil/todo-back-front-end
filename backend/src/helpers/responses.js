module.exports.sendResponse = function (res, success, statusCode, message, data, errors) {
    return res.status(statusCode).json({
               success,
               statusCode,
               message,
               data,
               errors,
               time: new Date().toISOString()
    });
}