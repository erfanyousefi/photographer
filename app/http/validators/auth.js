const {body} = require("express-validator")
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
}