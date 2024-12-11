const userModel = require("../model/user.model")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")

const signup=async(req,res)=>{
    const {email,password,name}=req.body

    if(!email || !password || !name)
    {
        return res.status(400).json({massage:"please fill in all fields"})
    }

    const isuserExist=await userModel.findOne({email})
    if(isuserExist){
        return res.status(400).json({massage:"email already exist"})
    }
    try {

        //password hashing

        bcrypt.hash(password, 5, async(err, hash)=> {
            if(err){
                return res.status(400).json({massage:"password hashing failed"})
            }
            await userModel.create({email,password:hash,name})
            res.status(201).json({massage:"user created successfully"})
        });
    } catch (error) {
        res.status(400).json({massage:error.message})
    }
}

const signin=async(req,res)=>{
    const {email,password}=req.body

    if(!email || !password )
    {
        return res.status(400).json({massage:"please fill in all fields"})
    }
     
    try {
        const isuserExist=await userModel.findOne({email})

    if(!isuserExist){
        return res.status(400).json({massage:"email does not exist"})
    }
    //comparing hashing password
    bcrypt.compare(password, isuserExist.password, (err, result)=> {
        if(err){
      return res.status(400).json({massage:"comparing Problem"})
        }
        if(result){
            //genrate token
            const token=jwt.sign({ userId:isuserExist._id }, "zfjvvfk",{
                expiresIn:"7d"
            });
            //token set in cookie
            res.cookie("AccessToken",token).status(200).json({massage:"Login Succesfully"})
        }
    });
    } catch (error) {
        res.status(400).json({massage:error.message})
    }

}

module.exports={signup,signin}