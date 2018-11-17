export const handleError = (err, code, message, type, res) => {
    return res.status(code).json({
        type: type,
        message: message,
        error: err
    })
}

export const handleResponse = (success, message, data, code, res) => {
    return res.status(code).json({
        success: success,
        message: message,
        data: data
    })
}

