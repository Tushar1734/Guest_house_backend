

const validateRole =(role)=>{
    return (req,res,next)=>{
        if(!req.user || req.user.user_type !== role){
            res.status(400).json({message:"Forbidden... Admin access only.. "});
        }
        next();
    }
}

export default validateRole;