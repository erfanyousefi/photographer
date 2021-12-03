module.exports.isActive = async(req, res, next) => {
    const user = req.user;
    if(user.active){
        next();
    }else{
        return res.status(403).json({
            status : 403, 
            success : false,
            error : "Forbidden",
            message : "حساب کاربری شما هنوز فعال نشده است، لطفا صبر داشته باشید"

        })
    }
}