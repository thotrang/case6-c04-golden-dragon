const Brand = require("../models/Brand");

// getAll
const getAllBrand = async(req,res,next) => {
    try {
        let brands = await Brand.find()
        res.status(200).json(brands)
    } catch(err) {
        console.log(err);
        res.status(400).json(err);

    }
};
//create
const createBrand = async(req,res,next) => {
    try {
        const brand =  await Brand.create(req.body)
        res.status(200).json({
            message : "true",
            brand
            })
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
};
//update 
const updateBrand = async(req,res,next) =>{
    let id = req.params.id;
    let name = req.body.name
    try {
        let brand = await Brand.findById(id);
        if (!brand) {
            res.status(404).json({message:"Discount not exist"});
        } else {
            brand = await Brand.findByIdAndUpdate({
                _id:id
            },{
                name:name
            })
            let newBrand = await Brand.findById(id)
            res.status(200).json(newBrand)
        }
    } catch(err) {
        console.log(err);
        res.status(404).json(err)
    }
}
// delete Brand
const deleteBrand = async(req,res,next) => {
    let id = req.params.id
    try {
     let brand = Brand.findById(id);
     if(!brand) {
        res.status(404).json({
            success : false,
            message :"Brand not exist"
            })
     }  else {
        await brand.deleteOne();
        res.status(200).json("Delete success!!")
     }
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}

module.exports = {
   getAllBrand,
   createBrand,
   updateBrand,
   deleteBrand
}