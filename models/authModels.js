import mongoose from "mongoose";

const  authShema=new mongoose.Schema({
     name:{ type: String },
     role:{type:String ,default:"user"},
     email:{type:String  ,required: true ,unique : true},
     password:{type:String  ,required: true}
})

const  User=mongoose.model("userInfo" , authShema)
export default User