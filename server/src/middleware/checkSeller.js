
const checkSeller = (req,res,next) =>{
    let role = req.user.role;
    if(!role){
        res.status(404).json({
            message:"you is anonimos"
        })
    }else{
        if(role == 'seller'){
            next();
        }else{
            res.status(401).json('you is anonymos')
        }
    }
}
module.exports = checkSeller