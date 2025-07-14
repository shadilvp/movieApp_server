import mongoose from "mongoose";
import bcrypt from "bcrypt";
import joi from "joi";

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Admin name"]
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
        phone: {
            type: Number,
            require: [true, "Please enter the phone number"],
            unique: true,
        },     
        adminRoll: {
            type: String,
            require: [true, "Please enter the roll of admin"],
            required: true
        },
        profileImage: {
            type: String,
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
            password: joi.string().min(6).required(),
            phone: joi.number().min(10).required(),
            adminRoll: joi.string().required()
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