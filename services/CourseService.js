const courseRepository = require("../repositories/CourseRepository");
const categoryRepository = require("../repositories/CategoryRepository");
const Course = require("../models/Course");
class CourseService{
async getAllCourses(){
return await courseRepository.getAll();
}
async getCourseById(id){
return await courseRepository.getById(id);
}
async createCourse(title,description, price, categoryName){
if(!title){
throw new Error("Title is required");
}
if(!description){
throw new Error("Description is required");
}
if(price===null || price<0 || price === undefined ){
throw new Error("Price cannot be negative number");
}
if(!categoryName){
throw new Error("Category Name is required!");
}
const category = await courseRepository.getCategories(categoryName);
if (!category) {
throw new Error("Category not found"); }
const course = new Course(null, title, description, price, category.id);
return await courseRepository.create(course.title, course.description, course.price, course.category_id);
}
async searchCourseByTitle(title){
return await courseRepository.searchByTitle(title);
}
async deleteCourse(id){
const course = await courseRepository.delete(id);
return course;
}
async updateCourse(id, title, description, price, categoryName){
if(!title){
throw new Error("Title is required");
}
if(!description){
throw new Error("Description is required");
}
if(price===null || price<0 || price === undefined ){
throw new Error("Price cannot be negative number");
}
if(!categoryName){
throw new Error("Category Name is required!");
}
const category = await courseRepository.getCategories(categoryName);
if(!category){
throw new Error("Category not found");
}
const course = new Course(id, title, description, price, category.id);
const updatedCourse = await courseRepository.update(course.id,course.title,course.description,course.price,course.category_id);
if(!updatedCourse){
return null;}
return updatedCourse;
}
}
module.exports = new CourseService();