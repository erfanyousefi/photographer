const requestModel = require("../../../../models/requests");
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
     async saveRatingForPhotographer(score, phone, atelier){
        const user = await UserModel.findOne({phone});
        if(user.role != "atelier") throw {status : 400, message : "فقط آتلیه استخدام کننده قادر به ثبت امتیاز میباشد"}
        const requester = await requestModel.findOne({requester : atelier, photographer : phone});
        if(!requester) throw {status : 400, message : "فقط آتلیه استخدام کننده قادر به ثبت امتیاز میباشد"}
        const result = await UserModel.updateOne({phone}, {$inc : {rating : +score}}).catch(err => {
            throw {status : 500, message : "ثبت امتیاز انجام نشد مجددا سعی کنید", err}
        })
        return result.modifiedCount > 0
    }
}