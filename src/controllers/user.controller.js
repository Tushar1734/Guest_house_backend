import poolPromise from "../DB/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
    const token =jwt.sign({
            id:user.id,
            name:user.name,
            email:user.email,
            phone:user.phone,
        },
         process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '1h'
        })
    return token;
}


const handleSignup = async (req, res) => {
  try {
    const { name, email, phone, password, user_type } = req.body;
    const pool = await poolPromise;
    if (!name || !email || !phone || !password || !user_type) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const ifUserExists = await pool
      .request()
      .query(`Select * from users WHERE email ='${email}'`);
    if (ifUserExists.recordset.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    let password_hash = await bcrypt.hash(password, 10);
    const result = await pool.request()
      .query(`INSERT INTO users(name,phone,email,password_hash,user_type)Values
                ('${name}','${phone}','${email}','${password_hash}','${user_type}')`);

    if (result.rowsAffected[0] > 0) {
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in creating user", error: error.message });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`SELECT * FROM users WHERE email='${email}'`);
    const isUserExists = result.recordset.length > 0;
    if (!isUserExists) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      result.recordset[0].password_hash
    );
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid Password" });
    }
    const user = {
      name: result.recordset[0].name,
      id: result.recordset[0].id,
      email: result.recordset[0].email,
    phone: result.recordset[0].phone,
      user_type: result.recordset[0].user_type,
      created_On: result.recordset[0].created_at,
    };

    const accessToken= generateAccessToken(user);

    const options={
        httponly:true,
        secure:true
    }


    res
    .cookie("accessToken", accessToken, options)
    .status(200)
    .json({ message: "User Logged in successfuly", user,"accessToken":accessToken});
  } catch (error) {
    res.status(500).json({ message: "Error in login", error: error.message });
  }
};

const handleLogout = async(req,res)=>{
try {
    const options={
        httponly:true,
        secure:true
    }
    res
    .clearCookie("accessToken",options)
    .status(200)
    .json({message:"Logged Out....."})
} catch (error) {
  res.status(500).json({message:"There is something error while log out please try again later...",error:error.message})
}
}

export { handleSignup, handleLogin,handleLogout };
