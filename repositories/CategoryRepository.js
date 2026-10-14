const pool = require("../db");
class CategoryRepository {

async getAll(){
const categories = await pool.query("Select id, name from categories");
return categories.rows;
}
async getById(id){
const result = await  pool.query("Select name from categories where id=$1",[id]);
return result.rows[0];
}
async create(name){
const result  = await pool.query(`insert into categories(name) values($1) returning id, name`,[name]);
return result.rows[0];
}
async patch(id,name){
const result = await pool.query(`Update categories set name = $2 where id =$1 returning id, name`, [id, name]);
return result.rows[0];
}
async deleteById(id){
const result =  await pool.query("delete from categories where id = $1", [id]);
return result.rows[0];}
}
module.exports = new CategoryRepository()