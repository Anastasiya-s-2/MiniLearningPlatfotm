const pool = require("../db");
class UserRepository{
async getAll(){
const result = await pool.query("Select id, email, role_id from users");
return result.rows;
}
async getById(id){
const result = await pool.query("Select id, email, role_id from users where id=$1",[id]);
return result.rows[0];
}
async getByEmail(email){
const result = await pool.query("Select id, email, role_id from users where email=$1",[email]);
return result.rows[0];
}
async getByEmailForAuth(email) {
const result = await pool.query("Select id, email, password, role_id from users where email = $1",[email]);
return result.rows[0];
}
async create(name, email,password,role_id){
const result = await pool.query(`INSERT INTO users (name, email, password, role_id)
             VALUES ($1, $2, $3, $4)
             RETURNING id, name, email, role_id`,
            [name, email, password, role_id]);
return result.rows[0];
}
async update(id, email, password, role_id) {
        const result = await pool.query(
            `UPDATE users
             SET email = $1, password = $2, role_id = $3
             WHERE id = $4
             RETURNING id, email, role_id`,
            [email, password, role_id, id]
        );

        return result.rows[0];
    }
async delete(id) {
        const result = await pool.query(
            "DELETE FROM users WHERE id = $1 RETURNING id",
            [id]
        );

        return result.rows[0];
    }
}
module.exports = new UserRepository();