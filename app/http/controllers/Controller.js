const autoBind = require("auto-bind")
const jwt = require("jsonwebtoken")
require("./../../utils/config/global")
const bcrypt = require("bcrypt")
module.exports = class Controller{
    constructor(){
        autoBind(this)
    }
    async tokenGenerator(payload){
        return await jwt.sign(payload, globalThis.secretKey, {
            algorithm : "HS256", expiresIn : (new Date().getTime() + (1000 * 60 *60 * 24 * 30)),
        })
    }
    async hashPassword(data){
        const salt =  await bcrypt.genSaltSync(15);
        const hashedData = await bcrypt.hashSync(data, salt);
        return hashedData;
    }
    async passwordVerify(password, hashedPassword){
        return await bcrypt.compareSync(password, hashedPassword)
    }
    async createForgoPasswordToken(){
        return await this.hashPassword("yourForget Password?!!! why?!") + "_@_" + (new Date().getTime() + (1000 * 60 * 5));
    }
}