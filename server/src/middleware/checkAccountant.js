
const checkAccountant = (req,res,next) =>{
    let role = req.user.role;
    if(!role){
        res.status(404).json({
            message:"you is anonimos"
        })
    }else{
        if(role == 'accountant'){
            next();
        }else{
            res.status(401).json('you is anonymos')
        }
    }
}
module.exports = checkAccountant