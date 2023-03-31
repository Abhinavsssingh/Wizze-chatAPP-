const UserModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const {uploadFile} = require("../asw/awsS3")

const  registerUser = async (req,res) =>{

try{
    
    const data = req.body
    const image = req.files
    console.log(image[0])

    if(!data){
        return  res.status(403).send({message:"Please Enter all the feilds"})
    }

    const {name , email , password  } = data

    if(!name || !email || !password) {
       return  res.status(400).send({message:"Please Enter all the feilds"})
    }

    const user = await UserModel.findOne({email:email})
     if(user){
       return  res.status(400).send({message:"User Already exists"})
     }

     let salt = await bcrypt.genSalt(10);
     data.password = await bcrypt.hash(data.password, salt);

     
    if(image[0]){
     let url = await uploadFile(image[0]);
     data["pic"] = url;
    }

    

     const tosend = await UserModel.create(data)

     return res.status(201).send({status:true,data:tosend})

    }
    catch(err){
        return res.status(500).send({status:false , message:err.message})

    }

}

const login = async (req, res)=>{
    try{
    const {email,password} = req.body

    if(!email) return res.status(400).send({status : false , message : "email id is required"})
    if(!password) return res.status(400).send({status : false , message : "password  is required"})

    const getUser = await UserModel.findOne({email:email})
    if(!getUser) return res.status(404).send({status : false , message : "User Not Found"})
        
    const checkPassword = await bcrypt.compare( password, getUser.password)
    if(!checkPassword)  return res.status(401).send({status : false , message : "incorrect password"})
    let payload = 
    {
          userId: getUser._id.toString(),
          emailId: getUser.email,
          
    }

    const  token = jwt.sign(payload,process.env.SECRET_KEY,  {expiresIn: "60m"} )
    console.log(token)
      
    return res.status(200).send({ status: true, message: "token is successfully generated", data:{userId: getUser._id,token:token}})

    }catch(err){
    return res.status(500).send({status : false, message : err.message})
    }
}

module.exports = {registerUser,login}

