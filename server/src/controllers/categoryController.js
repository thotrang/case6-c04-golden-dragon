const Category = require("../models/Category");

// getAll
const getAllCategory = async(req,res,next) => {
    try {
        let categories = await Category.find()
        res.status(200).json(categories)
    } catch(err) {
        console.log(err);
        res.status(400).json(err);

    }
};
//create
const createCategory = async(req,res,next) => {
    try {
        const category =  await Category.create(req.body)
        res.status(200).json({
            message : "true",
            category
            })
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
};
//update 
const updateCategory = async(req,res,next) =>{
    let id = req.params.id;
    let name = req.body.name
    try {
        let category = await Category.findById(id);
        if (!category) {
            res.status(404).json({message:"Discount not exist"});
        } else {
            category = await Category.findByIdAndUpdate({
                _id:id
            },{
                name:name
            })
            let newCategory = await Category.findById(id)
            res.status(200).json(newCategory)
        }
    } catch(err) {
        console.log(err);
        res.status(404).json(err)
    }
}
// delete Category
const deleteCategory = async(req,res,next) => {
    let id = req.params.id
    try {
     let category = Category.findById(id);
     if(!category) {
        res.status(404).json({
            success : false,
            message :"Category not exist"
            })
     }  else {
        await category.deleteOne();
        res.status(200).json("Delete success!!")
     }
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}

module.exports = {
   getAllCategory,
   createCategory,
   updateCategory,
   deleteCategory
}