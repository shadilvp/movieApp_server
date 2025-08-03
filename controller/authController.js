import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.TOKEN_SECRET;
const JWT_REFRESH_SECRET = process.env.TOKEN_REFRESH_SECRET;

// Helpers
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

// Register
export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;


  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
    console.log( "email: ", email, "pass: " , password)

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ success: false, message: "No user found" });
    }
    

    const isMatch = await bcrypt.compare(password, user.password);
    

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await user.update({ refreshToken });
    

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    console.log("helo")

    return res.status(200).json({
      success: true,
      message: "Login successful",
      userData: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    console.log("logout")
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({ success: false, message: "User already logged out" });
    }

    const user = await User.findOne({ where: { refreshToken } });

    if (user) {
      await user.update({ refreshToken: null });
    }

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.COOKIE_FLAG === "true",
      sameSite: "Strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.COOKIE_FLAG === "true",
      sameSite: "Strict",
    });

    return res.status(200).json({ success: true, message: "Successfully logged out" });
  } catch (error) {
    console.log("Logout Error:", error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Refresh Token
export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.COOKIE_FLAG === "true",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};





export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not available",
      });
    }

    res.status(200).json({
      success: true,
      message: "Current admin data retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error getting current user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


