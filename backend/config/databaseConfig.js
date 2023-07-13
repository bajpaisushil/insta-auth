const mongoose=require("mongoose");

const MONGO_URL=process.env.MONGO_URL || "mongodb://localhost:27017/auth_express"
const dbConnect=()=>{
    mongoose.connect(MONGO_URL)
    .then((conn)=> console.log(`Connected to ${conn.connection.host}`))
    .catch((e)=> console.log(e.message))
}


module.exports=dbConnect;
