
const Controller = require("../../Controller")
const UserService = require("./user.service")
module.exports = new class UserController extends Controller{
    async sendRequest(req, res, next){
        try{
            
        }catch(error){
            next(error)
        }
    }
    async showProfile(req, res, next){
        try{
            const { id } = req.params;
            const user = await UserService.showProfile(id);
            return res.status(200).json({
                status : 200,
                success : true,
                user
            })
        }catch(error){
            next(error);
        }
    }
    async myProfile(req, res, next){
        try{
            const { _id } = req.user;
            const user = await UserService.showProfile(_id);
            return res.status(200).json({
                status : 200,
                success : true,
                user
            })
        }catch(error){
            next(error);
        }
    }
    async saveRatingForPhotographer(req, res, next){
        try{
            const {score, username : phone} = req.body;
            const atelier = req.user.phone;
            const result = await UserService.saveRating(score, phone, atelier);
            if(result){
                return res.status(201).json({
                    status : 201, 
                    success : true,
                    message : "ثبت امتیاز با موفقیت انجام شد"
                })
            }else{
                throw {status : 500, message : "ثبت امتیاز انجام نشد"}
            }
        }catch(error){
            next(error)
        }
    }
}