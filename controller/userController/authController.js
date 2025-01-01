import { User, validateUser } from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


const JWT_SECRET = "babyProducts967831"

//register a new User --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const userRegister = async (req, res) => {

        const { name, email, password, roll } = req.body;

        // Validate input fields
        const {error} = validateUser(req.body)
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

export const loginUser = async (req,res) => {


        const {email,password} = req.body


        const existingUser = await User.findOne({email})
        if(!existingUser){
           return  res.status(401).json({success : false,message:"No user is found"})
        }

        const isMatch = await bcrypt.compare(String(password),String(existingUser.password))
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            {   
                userId : existingUser._id,
                email : existingUser.email 
            },
            JWT_SECRET,
            { 
                expiresIn:'1h'
            } 
        );

        if(existingUser.roll === "admin"){
           return res.status(201).json({success : true, message: "Admin is logged succesfully ",data: existingUser,token})
        }else{
           return res.status(201).json({success : true, message: "User is logged succesfully ",data: existingUser,token})
        }

}
