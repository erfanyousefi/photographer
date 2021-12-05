const UserModel = require("../../../../models/users")
const Controller = require("../../Controller")

module.exports = new class UserService extends Controller{
    async sendRequest(filter = {}){
        const photographers = await UserModel.find(filter, {password : 0, token : 0}).sort({_id : -1});
        return photographers
    }
    async showProfile(id){
        const user = await UserModel.findOne({_id : id, role : "photographer", active : true}, {password : 0, token : 0, active : 0});
        if(user) return user
        throw {
            status : 404, 
            success : false,
            message : "نیروی کاری  یافت نشد"
        }
     }
}