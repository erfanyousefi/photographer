
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
    saveRating(req, res, next){
        try{

        }catch(error){

        }
    }
}