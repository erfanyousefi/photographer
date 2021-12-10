module.exports.isPhotographer = async (req, res, next) => {
    const {user} = req;
    if(user && user.role == "photographer"){
        next();
    }else{
        return res.status(403).json({
            status : 403,
            success : false,
            error : "access denied",
            message : 'دسترسی غیر مجاز'
        })
    }
}
module.exports.isAtelier = async (req, res, next) => {
    const {user} = req;
    if(user && user.role == "atelier"){
        next();
    }else{
        return res.status(403).json({
            status : 403,
            success : false,
            error : "access denied",
            message : 'دسترسی غیر مجاز'
        })
    }
}
module.exports.isAuthenticated = async (req, res, next) => {
    const {user} = req;
    if(!user){
        next();
    }else{
        return res.status(403).json({
            status : 403,
            success : false,
            error : "access denied",
            message : 'شما قبلا وارد حساب کاربری خود شده اید'
        })
    }
}