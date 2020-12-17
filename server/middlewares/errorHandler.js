function errorHandlers ( err , req, res, next ){
    let errors = []
    let statusCode = 500

    switch (err.name) {
        case "JsonWebTokenError":
        case "AuthenticationFailed" :
            errors.push("Please Login First")
            statusCode = 401
            break;
        case "SequelizeUniqueConstraintError":
        case "SequelizeValidationError":
            err.errors.forEach(element => {
                errors.push(element.message)
            })
            statusCode = 400
            break;
        default:
            errors.push(err.msg || "Internal Server Error")
            statusCode = err.statusCode || 500
    }

    res.status(statusCode).json({
        errors : errors
    })
}

module.exports = errorHandlers