
const checkUser = (req,res,next) =>{
    let role = req.user.roleId.name;
    if(!role){
        res.status(404).json({
            message:"you is anonimos"
        })
    }else{
        if(role == 'user'){
            next();
        }else{
            res.status(401).json('you is anonymos')
        }
    }
}
module.exports = checkUser