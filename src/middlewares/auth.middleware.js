import jwt from 'jsonwebtoken';
import poolPromise from '../DB/index.js';

const verifyJWT = async (req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Unauthorized Request" });
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }
       const pool =await poolPromise;
       const  user =await pool.request().query(`Select id,name,email,phone,user_type,created_at from users Where id = ${decodedToken.id}`); 
        if (user.recordset.length === 0) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }
        req.user = {
            id: user.recordset[0].id,
            name: user.recordset[0].name,
            email: user.recordset[0].email,
            phone: user.recordset[0].phone,
            user_type: user.recordset[0].user_type,
            created_at: user.recordset[0].created_at
        };
        next();
    } catch (error) {
        res.status(401).json({ message: error.message || "Invalid Access Token" });
    }
}

export default verifyJWT;