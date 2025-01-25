import mongoose from "mongoose";

const  foodScheema=new mongoose.Schema({
      name :  {type : String, required: true },
      price :  {type : String, required: true },
       filename: String,
       contentType: String, 
       fileData: Buffer,
})

const  Food=mongoose.model("food",foodScheema );
 
export default  Food;



