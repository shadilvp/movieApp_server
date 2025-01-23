import { User, validateUser } from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateToken } from "../../utils/asyncHandler.js";


dotenv.config()

//register a new User --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const userRegister = async (req, res) => {

    const { name, email, password, roll } = req.body;

    // Validate input fields
    const { error } = validateUser(req.body)
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    console.log('Received data:', { name, email, password });

    // Check if user already exists
    const currentUser = await User.findOne({ email });
    if (currentUser) {
        return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const newUser = new User({
        name,
        email,
        password,
        roll

    })
    console.log(newUser);


    await newUser.save();

    return res.status(201).json({ success: true, message: 'User successfully registered', data: newUser });

}

//User Loign ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const loginUser = async (req, res) => {


    const { email, password } = req.body


    const existingUser = await User.findOne({ email })
    if (!existingUser) {
        return res.status(401).json({ success: false, message: "No user is found" })
    }

    const isMatch = await bcrypt.compare(String(password), String(existingUser.password))
    if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const accessToken = generateToken(existingUser._id);
    console.log(accessToken);

    const refreshToken = jwt.sign(
        { userId: existingUser._id, email: existingUser.email },
        process.env.TOKEN_REFRESH_SECRET,
        { expiresIn: "7d" }
    )

    existingUser.refreshToken = refreshToken;
    await existingUser.save()

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

    if (existingUser.roll === "admin") {
        return res.status(201).json({ success: true, message: "Admin is logged succesfully ", data: existingUser, accessToken })
    } else {
        return res.status(201).json({ success: true, message: "User is logged succesfully ", data: existingUser, accessToken })
    }

}

//Logout ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const logoutUser = (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(200).json({ success: true, message: "Logged out successfully" });
};


//refreshToken ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(403).json({ success: false, message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({ success: false, message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true });
    return res.status(200).json({ success: true, message: "Access token refreshed" });

}


export const getCurrentUser = async (req, res) => {

    
    const { userId } = req.params;

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);  // Send the user details as response
        })
        .catch(err => {
            res.status(500).json({ message: 'Server error' });
        });
}