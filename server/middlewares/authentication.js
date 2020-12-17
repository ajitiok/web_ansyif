const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

async function authentication ( req , res , next ){

    try {
        let { access_token } = req.headers

        let decoded = verifyToken(access_token)

        let user = await User.findOne({
            where : {
                email : decoded.email
            }
        })
        if ( !user ) throw { name : "AuthenticationFailed"}
        req.userData = decoded
        next()
    } catch (error) {
        next(error)
    }
}


module.exports = authentication