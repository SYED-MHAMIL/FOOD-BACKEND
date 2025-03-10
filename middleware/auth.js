import jwt from "jsonwebtoken";
import evn from "dotenv";
evn.config();

const {API_SECRET} =process.env


const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({msg:'No token, authorization denied'});
    }

    const token = authHeader.split(' ')[1];

    try {

        const decoded = jwt.verify(token,API_SECRET);

        req.user = decoded;

        next();

    } catch (e) {
        console.error("Token verification error:", e.message);
        res.status(401).json({msg:'Token is not valid'});
    }
};

export default authMiddleware