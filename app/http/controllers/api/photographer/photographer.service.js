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
}