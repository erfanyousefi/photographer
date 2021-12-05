
const Controller = require("../../Controller")
const AtelierService = require("./atelier.service");
const UserModel = require("../../../../models/users");
module.exports = new class AtelierController extends Controller{
    async saveRequest(req, res, next){
        try{
            const {employee, datetime} = req.body;
            const user = await UserModel.findOne({phone : employee});
            if(!user) throw {status : 404, message : "نیروی کار مورد نظر یافت نشد"};
            const atelier = req.user.phone;
            const payload = {
                employee, 
                datetime,
                atelier,
                requester : "atelier",
                status : "pending"
            }
            const result = await AtelierService.saveRequest(payload)
            return res.status(201).json({
                status : 201,
                success : true,
                message : "درخواست شما با موفقیت ثبت شد"
            })
        }catch(error){
            next(error);
        }
    }
    async showProfile(req, res, next){
        try{
            const { id } = req.params;
            const user = await AtelierService.showProfile(id);
            return res.status(200).json({
                status : 200,
                success : true,
                user
            })
        }catch(error){
            next(error);
        }
    }
}