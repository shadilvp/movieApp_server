import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config()

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Token not provided or invalid format.",
    });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Token is missing.",
    });
  }
  try {
    const validateToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!validateToken) {
      return res.status(401).json({ success: false, message: "Invalid token." });
    }

    req.user = validateToken; // Attach user data from the token to the request
    console.log("Verified User:", req.user);

    // Optional: Check if the `userId` in the route matches the token's `_id`
    if (req.params.userId && req.user._id !== req.params.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User ID mismatch.",
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: `Token verification failed: ${err.message}`,
    });
  }
};


