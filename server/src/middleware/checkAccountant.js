
const checkAccountant = (req,res,next) =>{
    let role = req.user.roleId.name;
    
    if(!role){
        console.log(req.user);
        res.status(404).json({
            message:"you is anonimos 1"
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