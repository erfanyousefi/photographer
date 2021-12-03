const Controller = require("./../../Controller")
const authService = require("./auth.service")
const bcrypt = require("bcrypt")
module.exports = new class AuthController extends Controller{
    async login(req, res, next) {
        try{
            const {username, password} = req.body;
            const token = await authService.login(username, password);
            return res.status(200).json({
                status : 200,
                success : true,
                token
            })
        }catch(error){
            next(error)
        }
    }
    async register(req, res, next){
        try {
            const {first_name, last_name, phone, registrantCode, nationalCode, address, role} = req.body;
            const token = await this.tokenGenerator({phone, registrantCode, nationalCode})
            const password = await bcrypt.hashSync(nationalCode, bcrypt.genSaltSync(15))
            const payload = {first_name, last_name, phone, registrantCode, nationalCode, address, token, role, password, active : false};
            const result = await authService.register(payload);
            return res.status(201).json({
                status : 201,
                success : true,
                message : "ثبت نام شما با موفقیت انجام شد پس از تایید میتوانید وارد حساب کاربری خود شوید",
                token
            })
        } catch (error) {
            next(error);
        }

    }
    async forgotPassword(req, res, next){
        
    }
}