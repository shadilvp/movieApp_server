import User from "../../models/userModel.js";

export const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input fields
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all required fields" });
        }

        console.log('Received data:', { name, email, password });

        // Check if user already exists
        const currentUser = await User.findOne({ email });
        if (currentUser) {
            return res.status(404).json({ success: false, message: 'User already exists' });
        }

        const newUser = new User({
            name,
            email,
            password // Storing plain password (Not recommended for production)
        })
        console.log(newUser);


        await newUser.save();

        return res.status(201).json({ success: true, message: 'User successfully registered', data: newUser });
    } catch (error) {
        console.error('Error:', error); // Log the error
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
}
