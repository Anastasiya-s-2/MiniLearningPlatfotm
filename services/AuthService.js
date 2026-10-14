const userRepository = require("../repositories/UserRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class AuthService{
async login(email, password){
const user = await userRepository.getByEmailForAuth(email);
if(!user){
throw new Error("Invalid email or password");
}
const passwordIsValid = await bcrypt.compare(password, user.password);
if (!passwordIsValid) {
throw new Error("Invalid email or password");
}
const token = jwt.sign(
{
id: user.id,
email: user.email,
role_id: user.role_id},
process.env.JWT_SECRET,
{
expiresIn: "1h"
}
);
return {token};
}


}
module.exports = new AuthService();