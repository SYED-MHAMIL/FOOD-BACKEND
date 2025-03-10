import express from "express";
import User from "../models/authModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();
let router = express.Router();
const {API_SECRET}=process.env;



router.post("/register", async(req,res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(404).send({
        message: "All field are Required",
      });
    }
    const user = new User({name,email,password})
    const hashPassword = await bcrypt.hash(password, 10);
    user.password=hashPassword
     await user.save();
    const    newUser= user.toObject()
   delete newUser.password
       const token= jwt.sign({...newUser},API_SECRET)

    return res.status(200).send({
      message: "user register succesfully",
      data: {...newUser ,token},
    });
  } catch (error) {
    res.status(404).send({ msg: error });
  }
});


router.post("/login", async(req,res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(404).send({
          message: "All field are Required",
        });
      }
      const user =await User.findOne({email})
         if(!user) return res.status(404).send({
            message: "user not Found please register"
          });
      const   isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch) return res.status(404).send({
        message: "Incorrect Password!"
      });

      const  newUser= user.toObject()
      delete newUser.password

         const token= jwt.sign({...newUser},API_SECRET,{expiresIn :'1h'})
  
      return res.status(200).send({
        message: "user login succesfully",
        data: {...user ,token},
      });
    } catch (error) {
       console.log('login mesg' , error);
       
      res.status(404).send({ msg: error });
    }
  });

export default router;
