const UserModel = require("../../../../models/users")
const RequestModel = require("../../../../models/requests")
const Controller = require("../../Controller")

module.exports = new class AuthService extends Controller{
    async getAllPhotographers(filter = {}){
        const photographers = await UserModel.find(filter, {password : 0, token : 0}).sort({_id : -1});
        return photographers
    }
    async confirmRequest(id, price){
        const request = await  RequestModel.findOne({_id : id});
        if(!request) throw {status : 400, message : "درخواستی با این مشخصات یافت نشد"}
        if(request.status !== "pending") throw {status : 400, message : "این درخواست قبلا از طرف شما رد یا قبول شده است"}
        const result = await RequestModel.updateOne({_id : id}, {$set : {status : "confirmed", price}})
        if(result.modifiedCount && result.acknowledged) return true
        return false
    }
    async cancelRequest(id, price){
        const request = await  RequestModel.findOne({_id : id});
        if(!request) throw {status : 400, message : "درخواستی با این مشخصات یافت نشد"}
        if(request.status !== "pending") throw {status : 400, message : "این درخواست قبلا از طرف شما رد یا قبول شده است"}
        const result = await RequestModel.updateOne({_id : id}, {$set : {status : "canceled"}})
        if(result.modifiedCount && result.acknowledged) return true
        return false
    }
    async addSkills(_id, skill){
        const skills = await UserModel.findOne({_id, skills : skill});
        if(skills){
            throw {status : 400, message : "شما این مهارت را قبلا به لیست مهارت های خود افزوده اید"}
        }
    }
    async getAllRequests(employee, status){
        if(!status)return await RequestModel.find({employee})
        return await RequestModel.find({employee, status})
    }
    async saveRating(score, phone){
        const result = await UserModel.updateOne({phone}, {$inc : {rating : +score}}).catch(err => {
            throw {status : 500, message : "ثبت امتیاز انجام نشد مجددا سعی کنید", err}
        })
        return result.modifiedCount > 0
    }
}