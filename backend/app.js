const express=require("express");
const router = require("./routes/authRoute");
const dbConnect = require("./config/databaseConfig");
const cookieParser=require("cookie-parser");
const cors=require("cors")
const bodyParser=require("body-parser")

const app=express()
dbConnect();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin: [process.env.CLIENT_URL],
//     credentials: true
// }))

app.use("/api/auth", router);
// app.use("/", (req, res)=>{
//     res.json({
//         data: "JWT Auth server"
//     })
// })


module.exports=app;
