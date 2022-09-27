const Product = require('../models/product')



//create Product admin
exports.createProduct =  async (req,res,next) =>{
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
}
//getAll
exports.getAllProducts = async (req,res) =>{
    const product = await Product.find()
    res.status(200).json(
        {
            message:"true",
            product
        }
    )
}
//update-admin
exports.updateProduct = async (req,res,next)=>{
    let product = Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify: false
    })
    res.status(200).json({
        success:true,
        product
    })
}
// delete
exports.deleteProduct = async (req,res,next)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }
    await  product.remove()
    res.status(200).json({
        success:true,
        message:"delete success"
    })
}
//get product details
exports.getProductDetails = async (req,res,next)=>{
    const product = await  Product.findById(req.params.id)
    if(!product){ const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(500).json({
                success:false,
                message:"product not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"delete success"
        })

    }
}