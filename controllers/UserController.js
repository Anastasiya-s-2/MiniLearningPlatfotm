const UserService = require("../services/UserService");

class UserController {

    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();

            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    static async getUserById(req, res) {
        try {
            const user = await UserService.getUserById(
                req.params.id
            );

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

   static async createUser(req, res) {
       try {
           const { email, password, name } = req.body;

           const user = await UserService.createUser(
               email,
               password,
               name
           );

           res.status(201).json(user);
       } catch (error) {
           res.status(400).json({
               message: error.message
           });
       }
   }


    static async updateUser(req, res) {
        try {
            const user = await UserService.updateUser(
                req.params.id,
                req.body
            );

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }


    static async deleteUser(req, res) {
        try {
            const user = await UserService.deleteUser(
                req.params.id
            );

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
}

module.exports = UserController;