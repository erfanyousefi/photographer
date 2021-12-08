const {body, query} = require("express-validator")
const UserModel = require("./../../models/users")
const nationalCodeValidator = require("./../../modules/national_code_vlidatior")
module.exports = new class authValidator{
    register(){
        return [
            body("first_name").notEmpty().withMessage("نام نمیتواند خالی باشد"),
            body("last_name").notEmpty().withMessage("نام خانوادگی نمیتواند خالی باشد"),
            body("phone").notEmpty().isMobilePhone("fa-IR").withMessage("شماره موبایل معتبر نمیباشد").custom(async phone => {
                const user = await UserModel.findOne({phone});
                if(user){
                    throw "شماره موبایل تکراری میباشد"
                }else{
                    return true
                }
            }),
            body("nationalCode").custom(async (nationalCode) => {
                const result = nationalCodeValidator(nationalCode);
                if(result){
                    const user = await UserModel.findOne({nationalCode});
                    if(user){
                        throw "کد ملی تکراری میباشد"
                    }else{
                        return true;
                    }
                }else{
                    throw "کد ملی معتبر نمیباشد"
                }
            }),
            body("registrantCode").notEmpty().withMessage("شماره عضویت نمیتواند خالی باشد"),
            body("address").notEmpty().withMessage("آدرس نمیتواند خالی باشد"),
            body("role").custom((role) => {
                const roles = ["photographer", "atelier"];
                if(roles.includes(role)){
                    return true;
                }else{
                    throw "نقش انتخابی شما صحیح نمیباشد"
                }
            })
        ]
    }
    forgetPassword(){
        return [
            body("phone").notEmpty().isMobilePhone("fa-IR").withMessage("شماره ارسال شده صحیح نمیباشد")
        ]
    }
    verifyPasswordToken(){
        return [
            body("password").custom(password => {
                if(password){
                    if (password.length < 8 || password.length > 16){
                        throw "رمز عبور باید حداقل 8 و حداکثر 16 کاراکتر باشد"
                    }else{
                        return true;
                    }
                }else{
                    throw "رمز عبور نمیتواند خالی باشد"
                }
            }),
            body("confirmPassword").custom((confirmPassword , {req}) => {
                if(confirmPassword && confirmPassword == req.body?.password){
                    return true;
                }else{
                    throw "رمز عبور و تکرار آن برابر نمیباشند"
                }
            }),
            query("token").custom((token, req) => {
                if(token){
                    const timestamp = token.split("_@_")[1];
                    const now = new Date().getTime();
                    console.log(+timestamp, +now);
                    if(+timestamp < +now) throw "توکن فراموشی رمز عبور منقضی شده";
                    return true;
                }else{
                    throw "توکن اعتبار سنجی نمیتواند خالی باشد"
                }
            })
        ]
    }
}