const Controller = require("../../Controller")
const photographerService = require("./photographer.service")
const bcrypt = require("bcrypt")
module.exports = new class PhotographerController extends Controller{
    async getAllPhotographers (req, res, next) {
        try{
            let  {filter} = req?.query || {};
            filter = {...filter, role : "photographer", active : true}
            const photographers = await photographerService.getAllPhotographers(filter);
            return res.status(200).json({
                status : 200,
                success : true,
                photographers
            })
        }catch(error){
            next(error)
        }
    }
    async confirmRequest(req, res, next){
        try{
            const {price} = req.body;
            const {id} = req.params;
            const result = await photographerService.confirmRequest(id, price)
            if(!result) throw {status : 500, message : "تایید درخواست با خطا مواجه شد"}
            return res.status(201).json({
                status : 200,
                success : true,
                message : "موافقت شما با درخواست انجام شد"
            })
        }catch(error){
            next(error)
        }
    }
    async cancelRequest(req, res, next){
        try{
            const {id} = req.params;
            const result = await photographerService.cancelRequest(id)
            if(!result) throw {status : 500, message : "لغو درخواست با خطا مواجه شد"}
            return res.status(201).json({
                status : 200,
                success : true,
                message : "عدم پذیرش شما با درخواست انجام شد"
            })
        }catch(error){
            next(error)
        }
    }
    async saveRating(req, res, next){
        try{
            
        }catch(error){
            next(error)
        }
    }
}