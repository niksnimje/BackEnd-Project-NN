const jwt=require("jsonwebtoken")

const isauth=(req,res,next)=>{
    const {AccessToken}=req.cookies
    if(!AccessToken){
        res.status(400).json({massage:"Please Login Frist"})
    }
    jwt.verify(AccessToken, 'zfjvvfk',(err, decoded)=> {
       if(err){
        res.status(400).json({massage:"Access Token error"})
       }
       next()
    });
}
module.exports=isauth