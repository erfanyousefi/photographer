const {validationResult} = require("express-validator")
module.exports = (req, res, next) => {
    try{
        let messages = {};
        const result = validationResult(req)
        if(result?.errors?.length > 0){
            Object.values(result.errors).forEach(error => {
                messages[error.param] = error.msg;
            })
            return res.status(400).json({
                status : 400, 
                success : false,
                messages
            })
        }else{
            next()
        }
    }catch(error){
        next(error)
    }
}