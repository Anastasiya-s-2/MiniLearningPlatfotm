const AuthService = require("../services/AuthService");
class AuthController{
static async login(req,res){
try{
const result = await AuthService.login(req.body.email, req.body.password);
return res.status(200).json(result);
}
catch(error){
return res.status(401).json({
                message: error.message});
}
}



}
module.exports = AuthController;