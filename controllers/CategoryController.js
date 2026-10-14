const CategoryService = require("../services/CategoryService");
class CategoryController{
async getAllCategories(req,res){
try{
const categories = await CategoryService.getAllCategories();
return res.status(200).json(categories);
}
catch(error){
return res.status(500).json({message: error.message});
}
}
async getCategoryById(req,res){
try{
const category = await CategoryService.getCategoryById(req.params.id);
if(!category){
return res.status(404).json({message: "Category not found"});
}
return res.status(200).json(category);}
catch(error){
return res.status(500).json({message: error.message});}}
async createCategory(req,res){
try{
const category = await CategoryService.createCategory(req.body.name);
return res.status(201).json(category);
}
catch(error){
return res.status(400).json({message: error.message});
}
}
async patchCategory(req,res){
try {
const category = await CategoryService.patchCategory(req.params.id, req.body.name);
if(!category){
return res.status(404).json({message: "Category not found"});
}
return res.status(200).json(category);
}
catch(error){
return res.status(400).json({message: error.message});
}}
async deleteCategory(req,res){
try {
const category = await CategoryService.deleteCategory(req.params.id);
if(!category){
return res.status(404).json({message: "Category not found"});
}
return res.status(200).json(category);
}
catch (error) {
            res.status(500).json({
                message: error.message
            });}
}
}
module.exports = new CategoryController();