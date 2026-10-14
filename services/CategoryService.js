const categoryRepository = require("../repositories/CategoryRepository");
const Category = require("../models/Category");
class CategoryService{
async getAllCategories() {
return await categoryRepository.getAll();
}
async getCategoryById(id){
return await categoryRepository.getById(id);
}
async createCategory(name){
if(!name){
throw new Error("Name is required");
}
const category = new Category(null,name);
return await categoryRepository.create(category.name);
}
async patchCategory(id, name){
if(!name){
throw new Error("Name is required");
}
const category = new Category(id, name);
return await categoryRepository.patch(category.id, category.name);
}
async deleteCategory(id){
return await categoryRepository.deleteById(id);


}

}
module.exports = new CategoryService();