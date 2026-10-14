const CourseService = require("../services/CourseService");
class CourseController{
static async getAllCourses(req,res){
try{
const course = await CourseService.getAllCourses();
return res.status(200).json(course);
}
catch(error){
return res.status(500).json({message: error.message});
}
}
static async getCourseById(req,res){
try{
const course = await CourseService.getCourseById(req.params.id);
if(!course){
return res.status(404).json({message: "Course with this id not found"});
}
return res.status(200).json(course);
}
catch(error){
return res.status(500).json({message: error.message});
}
}
static async getCourseByTitle(req,res){
try{
const course = await CourseService.searchCourseByTitle(req.params.title);
if(!course){
return res.status(404).json({message: "Course with this title not found"});
}
return res.status(200).json(course);
}
catch(error){
return res.status(500).json({message: error.message});
}
}
static async deleteCourse(req,res){
try{
const course  = await CourseService.deleteCourse(req.params.id);
if(!course){
return res.status(404).json({message: "Course with this id not found"});
}
return res.status(200).json(course);
}
catch(error){
return res.status(500).json({message: error.message});
}
}
static async patchCourse(req,res){
try{
const course = await CourseService.updateCourse(req.params.id, req.body.title, req.body.description, req.body.price, req.body.category);
if(!course){
return res.status(404).json({message: "Course with this id not found"});
}
return res.status(200).json(course);
}
catch(error){
return res.status(400).json({message: error.message});
}
}
static async createCourse(req,res){
try{
const course = await CourseService.createCourse(req.body.title, req.body.description, req.body.price, req.body.category);
return res.status(201).json(course);
}
catch (error) {
return res.status(400).json({message: error.message});}
}
}
module.exports = CourseController;
