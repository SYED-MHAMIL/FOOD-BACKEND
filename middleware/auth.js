import jwt from "jsonwebtoken";
import evn from "dotenv";
evn.config();

const {API_SECRET} =process.env

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header["authorization"];
  if (!authHeader || authHeader.startsWith("Bearer ")) {
    return res.status(404).send({ msg: "not tokken ,authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.compare(token,API_SECRET)  ;
    if(!decoded) return res.status(404).send({ msg: "Invalid token" }); 
    
   req.user=decoded
   console.log("decodded" , decoded);
  next()
    
    



  } catch (error) {
    return res.status(404).send({ msg: error.message });
  }
};


export default authMiddleware