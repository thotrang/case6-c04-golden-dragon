const Discount = require("../models/Discount");

// getAll
const getAllDiscounts = async(req,res,next) => {
    try {
        let discounts = await Discount.find()
        res.status(200).json(discounts)
    } catch(err) {
        console.log(err);
        res.status(400).json(err);

    }
};
//create
const createDiscount = async(req,res,next) => {
    try {
        const discount =  await Discount.create(req.body)
        res.status(200).json({
            message : "true",
            discount
            })
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
};
//update discount
const updateDiscount = async(req,res,next) =>{
    let id = req.params.id;
    let name = req.body.name
    try {
        let discount = await Discount.findById(id);
        if (!discount) {
            res.status(404).json({message:"Discount not exist"});
        } else {
             discount = await Discount.findByIdAndUpdate({
                _id:id
            },{
                name:name
            })
            let newDiscount = await Discount.findById(id)
            res.status(200).json(newDiscount)
        }
    } catch(err) {
        console.log(err);
        res.status(404).json(err)
    }
}
// delete discount
const deleteDiscount = async(req,res,next) => {
    let id = req.params.id
    try {
     let discount = Discount.findById(id);
     if(!discount) {
        res.status(404).json({
            success : false,
            message :"Discount not exist"
            })
     }  else {
        await discount.delete();
        res.status(200).json("Delete success!!")
     }
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}

module.exports = {
    getAllDiscounts,
    deleteDiscount,
    createDiscount,
    updateDiscount
}

