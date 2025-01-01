import mongoose from "mongoose";
import Joi from "joi";

const addressSchema = new mongoose.Schema(
    {
        userId:{
            type : mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        firstName:{ 
            type: String, 
            required: true 
        },
        lastName:{ 
            type: String,
            required: true
        },
        email:{ 
            type: String, 
            required: true 
        },
        mobile:{ 
            type: String, 
            required: true 
        },
        addressLine:{ 
            type: String, 
            required: true 
        },
        city:{ 
            type: String, 
            required: true 
        },
        state:{
            type: String, 
            required: true 
        },
        pinCode:{ 
            type: String, 
            required: true 
        },
        country:{ 
            type: String,
            required: true 
        },
    }
)

const validateAddress = (address) => {
    const schema = Joi.object({
        firstName: Joi.string().min(1).required().label("First Name"),
        lastName: Joi.string().min(1).required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        mobile: Joi.string().pattern(/^[0-9]{10}$/).required().label("Mobile"),
        addressLine: Joi.string().min(5).required().label("Address Line"),
        city: Joi.string().min(2).required().label("City"),
        state: Joi.string().min(2).required().label("State"),
        pinCode: Joi.string().pattern(/^[0-9]{6}$/).required().label("Pin Code"),
        country: Joi.string().min(2).required().label("Country"),
    });
    return schema.validate(address);
};


const Address = mongoose.model("Address",addressSchema)

export {Address, validateAddress};