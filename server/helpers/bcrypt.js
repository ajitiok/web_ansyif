const bcrypt = require("bcryptjs")

function hassPasword(password){
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function comparePass(password, hassPass){
    return bcrypt.compareSync(password , hassPass)
}


module.exports = { hassPasword , comparePass }


