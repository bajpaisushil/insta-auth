const mongoose=require("mongoose")
const JWT=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [5, "Name must be at least 5 characters"],
        maxLength: [50, "Name must be less than 50 characters"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already taken. Try another one"]
    },
    email: {
        type: String,
        required: [true, "User email is required"],
        lowercase: true,
        unique: [true, "Already Registered Email"]
    },
    password: {
        type: String,
        select: false
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordExpiryDate: {
        type: String
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password, 10);
    return next()
})

userSchema.methods={
    jwToken() {
        return JWT.sign(
            {id: this._id, email: this.email},
            process.env.SECRET,
            {expiresIn: '24h'}
        )
    }
}


const userModel=mongoose.model("user", userSchema)
module.exports=userModel;
