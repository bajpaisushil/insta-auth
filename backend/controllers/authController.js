const userModel = require("../models/userSchema");
const emailValidator=require("email-validator");
const bcrypt=require("bcrypt");

const signup=async(req, res)=>{
    const {name, username, email, password, confirmPassword}= req.body;
    console.log(name, username, email, password, confirmPassword);
    try {
        if(!name || !username || !email || !password || !confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Every field is required"
            })
        }
        var validEmail=emailValidator.validate(email);
        if(!validEmail){
            return res.status(400).json({
                success: false,
                message: "Please Provide valid email"
            })
        }
        if(password!==confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password & Confirm Password doesn't match"
            })
        }
        const usernameExist=await userModel.findOne({username});
        if(usernameExist){
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            })
        }
        const userInfo=userModel(req.body);
        const result=await userInfo.save();

        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (e) {
        if(e.code===11000){
            return res.status(400).json({
                success: false,
                message: "Account already exists"
            })
        }
        return res.status(200).json({
            success: false,
            message: e.message
        })
    }
}

const signin=async(req, res)=>{
    const {username, password}=req.body;

    if(!username || !password){
        return res.status(400).json({
            success: false,
            message: "Every field is required"
        })
    }
    try {
        const user=await userModel
        .findOne({username})
        .select('+password')
        
        if(!user || !await bcrypt.compare(password, user.password)){
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        const token=user.jwToken();
        user.password=undefined;

        const cookieOptions={
            maxAge: 24*60*60*1000,
            httpOnly: true
        }
        res.cookie("token", token, cookieOptions)
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

const getUser=async ()=>{
    const userId=req.user.id;
    try {
        const user=await userModel.findById(userId)
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

const logout=()=>{
    try {
        const cookieOptions={
            expires: new Date(),
            httpOnly: true
        }
        res.cookie("token", null, cookieOptions)
        return res.status(200).json({
            success: true,
            message: "Logged Out!"
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

module.exports={
    signup, signin, getUser, logout
}
