const UserModel = require("./../../../../models/users")
const Controller = require("./../../Controller")

module.exports = new class AuthService extends Controller{
    async login(username, password) {
        const user = await UserModel.findOne({phone : username});
        if(user){
            const result = await this.passwordVerify(password, user.password);
            const {phone, nationalCode, registrantCode} = user;
            if(result){
                let token = await this.tokenGenerator({phone, nationalCode, registrantCode});
                await UserModel.updateOne({phone : username}, {$set : {token}});
                return token
            }else{
                throw{
                    status : 400, 
                    success : false,
                    message : "نام کاربری یا رمز عبور اشتباه میباشد"
                }
            }
        }else{
            throw{
                status : 404, 
                success : false,
                message : "نام کاربری یافت نشد"
            }
        }
    }
    async register(payload){
        const result = await UserModel.create(payload).then(doc => doc).catch(error => {
            throw {status : 500, message : "ثبت نام انجام نشد ", error}
        })
        return true

    }
    async forgotPassword(req, res, next){

    }
}