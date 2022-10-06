const Item = require("../models/Item")

const createItem = async (req,res,next) => {
    try{
        const data = {
            
        }
        const item = await Item.create(data)
    }catch(err){
        res.status(400).json(err)
    }
}
