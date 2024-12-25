import { User, validateUser } from "../../models/userModel.js";
import bcrypt from "bcryptjs";

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
        if(!email || !password){
            return res.status(404).json({success : false, message : "Please please all this required fields"})
        }

        const existingUser = await User.findOne({email})
        if(!existingUser){
           return  res.status(401).json({success : false,message:"No user is found"})
        }

        const isMatch = await bcrypt.compare(String(password),String(existingUser.password))
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        if(existingUser.roll === "admin"){
           return res.status(201).json({success : true, message: "Admin is logged succesfully ",data: existingUser})
        }else{
           return res.status(201).json({success : true, message: "User is logged succesfully ",data: existingUser})
        }

}
