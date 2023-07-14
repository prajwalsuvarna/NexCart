import JWT from   'jsonwebtoken'
import userModel from '../models/userModel.js'

export const requireLogin=async (req,res,next)=>{
try{
    const decode=JWT.verify(req.headers.authorization,process.env.JWT_SECRET)
    req.user=decode//adding the decoded playload to the request object which contains the id
    next()
}catch(error){
    console.log(error)
    res.status(401).send({
        success:false,
        message:"You are not authorized"
    })

}

}

//Admin Access
export const isAdmin=async (req,res,next)=>{
    try{
        
        const user=await userModel.findById(req.user.id)
      
        if(user.role!==1){
            return res.status(401).send({
                success:false,
                message:"You are not authorized"
            })
        }
        next()
    }catch(error){
        console.log(error)
        return res.status(401).send({
            success:false,
            message:error.message
        })
    
    }
    
    }