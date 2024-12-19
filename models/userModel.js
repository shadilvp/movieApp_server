import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Your Name"]
        },

        email: {
            type: String,
            required: [true, "Please Enter Your Email"],
            unique: true,
        },

        password: {
            type: String,
            required: [true, "Please Enter A Password"],
        },

        isBlock: {
            type: Boolean,
            default: false,
        },

        roll: {
            type: String,
            default: "user",
            required:true
        },

        cart: {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Cart"
        },

        orders: []
    }
);

const User = mongoose.model("User", userSchema)

export default User ;


