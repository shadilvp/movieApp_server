import jwt from "jsonwebtoken"

const JWT_SECRET = "babyProducts967831"

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ success: false, message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
}

