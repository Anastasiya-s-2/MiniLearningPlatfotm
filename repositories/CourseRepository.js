const pool = require("../db");
class CourseRepository {
async getAll(){
const result = await pool.query("Select courses.id, courses.title, courses.description, courses.price, c.name as category, courses.created_at from courses left join categories c on c.id = courses.category_id");
return result.rows;
}
async getById(id){
const result = await pool.query("Select courses.id, courses.title, courses.description, courses.price, c.name as category, courses.created_at from courses left join categories c on c.id = courses.category_id where courses.id=$1",[id]);
return result.rows[0];
}
async delete(id){
const result = await pool.query("Delete from courses where id = $1 returning id", [id]);
return result;
}
async create(title,description,price,category_id){
const result = await pool.query(`insert into courses(title,description,price,category_id) values($1,$2,$3,$4) returning title,description,price,category_id,created_at`,[title,description,price,category_id]);
return result.rows[0];
}
async searchByTitle(title){
const result = await pool.query("Select courses.id, courses.title, courses.description, courses.price, c.name as category, courses.created_at from courses left join categories c on c.id = courses.category_id where courses.title=$1",[title]);
return result.rows;

}
async getCategories(name){
const result = await pool.query("Select id, name from categories where name=$1",[name]);
return result.rows[0];
}
async update(id, title, description, price, category_id) {
        const result = await pool.query(
            `UPDATE courses
             SET title = $1, description=$2, price = $3, category_id = $4
             WHERE id = $5
             RETURNING id, title, description, price, category_id`,
            [title, description, price, category_id, id]
        );
        return result.rows[0];
}
}
module.exports = new CourseRepository();