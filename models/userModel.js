import mongoose from "mongoose";
import bcrypt from "bcrypt";
import joi from "joi";

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
            type: String
        },
        refreshToken: {
             type: String, 
        },
        roll: {
            type: String,
            default: "user",
            required:true
        },
        profileImage: {
            type: String,
        },
        normalImage: {
            type: String
        },
        phone: {
            type:Number
        },
        isBlock: {
            type: Boolean,
            default: false,
        },
        wallet: {
            type:Number,
            default:0,
        },
        isDeleted : {
            type:Boolean,
            default : false
        }
    },
    { timestamps:true }
);

const validateUser = (user) => {
    const schema = joi.object(
        {
            name:joi.string().min(3).required(),
            email:joi.string().email().required()
        });
    return schema.validate(user)
};

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password , salt);
        next()
    } catch (error) {
        next(error)
    }
});

const User = mongoose.model("User", userSchema)

export { User, validateUser };