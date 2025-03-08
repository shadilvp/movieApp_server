import mongoose from "mongoose";
import bcrypt from "bcrypt";
import joi from "joi";

const adminSchema = new mongoose.Schema(
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
            default: "admin",
            required:true
        },
        isDeleted : {
            type:Boolean,
            default : false
        }
    },
    { timestamps: true }
);

const validateAdmin = (admin) => {
    const schema = joi.object(
        {
            name:joi.string().min(3).required(),
            email:joi.string().email().required(),
            password: joi.string().min(6).required()
        });
    return schema.validate(admin)
};

adminSchema.pre('save', async function(next){
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

const Admin = mongoose.model("Admin", adminSchema)

export { Admin, validateAdmin };