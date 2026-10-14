const userRepository = require("../repositories/userRepository");
const User = require("../models/User");
const bcrypt = require("bcrypt");
class UserService {

    async getAllUsers() {
        return await userRepository.getAll();
    }

    async getUserById(id) {
        return await userRepository.getById(id);
    }

    async getUserByEmail(email) {
        return await userRepository.getByEmail(email);
    }

    async createUser(email, password, name) {
        if(email === undefined || email === null || email===""){
        throw new Error("Email is required");}
        if(password === undefined || password === null || password===""){
        throw new Error("Password is required");}
        const existingUser = await userRepository.getByEmail(email);
        if (existingUser) {
            throw new Error("User with this email already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(
            null,
            name,
            email,
            hashedPassword,
            2
        );

        return await userRepository.create(
            user.name,
            user.email,
            user.password,
            user.role_id
        );
    }

async updateUser(id, email, password, role_id) {
if(email === undefined || email === null || email===""){
throw new Error("Email is required");}
if(password === undefined || password === null || password===""){
throw new Error("Password is required");}
if(role_id === undefined || role_id ===null || role_id === ""){
throw new Error("Role is required");}

        const user = new User(
            id,
            email,
            await bcrypt.hash(user.password,10),
            role_id
        );

        return await userRepository.update(
            user.id,
            user.email,
            user.password,
            user.role_id
        );
    }

    async deleteUser(id) {
        return await userRepository.delete(id);
    }
}

module.exports = new UserService();