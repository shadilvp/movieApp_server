import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config()

const JWT_SECRET = process.env.TOKEN_SECRET


export const verifyAccessToken = (req, res, next) => {
  const {accessToken} = req.cookies
  // console.log("accessToken",accessToken)
  if (!accessToken) return res.status(401).json({ message: "Access Denied! there is no token" });

  try {
      const decoded = jwt.verify(accessToken, JWT_SECRET);
      // console.log(decoded);
      
      req.user = decoded;
      next();
  } catch (error) {
      console.log(error)
      res.status(403).json({ message: "Invalid or Expired Token" });
  }
};


