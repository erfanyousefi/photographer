const RequestModel = require("../../../../models/requests")
const UserModel = require("../../../../models/users")
const Controller = require("../../Controller")

module.exports = new class AtelierService extends Controller{
    async saveRequest(payload){
        const result = await RequestModel.create(payload).catch(error => {
            throw {
                status : 500, 
                success : false,
                message  : " ثبت درخواست با خطا مواجه شد",
                error
            }
        })
        return result
    }
    async showProfile(id){
       const user = await UserModel.findOne({_id : id, role : "atelier"});
       if(user) return user
       throw {
           status : 404, 
           success : false,
           message : "نیروی کاری  یافت نشد"
       }
    }
}