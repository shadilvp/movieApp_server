import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
            type: String,
            required: [true, "Please Enter A Password"],
        },

        refreshToken: {
             type: String, 
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
        isDeleted : {
            type:Boolean,
            default : false
        },
        cart:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Cart"
        },   
        addresses:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address"
        }],
        orders:[]
    }
);

const validateUser = (user) => {
    const schema = joi.object(
        {
            name:joi.string().min(3).required(),
            email:joi.string().email().required(),
            password:joi.string().min(4).required(),
        });
    return schema.validate(user)
}

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
})

const User = mongoose.model("User", userSchema)

export { User, validateUser };

