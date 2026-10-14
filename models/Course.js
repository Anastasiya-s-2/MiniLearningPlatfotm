class Course{
constructor(id, title, description, price, category_id, created_at){
this.id = id;
this.title = title;
this.description = description;
this.price = price;
this.category_id = category_id;
this.created_at = created_at;
}
}
module.exports = Course;
