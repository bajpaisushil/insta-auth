const express=require("express");
const { signup, signin, getUser, logout } = require("../controllers/authController");
const jwtAuth = require("../middleware/jwtAuth");
const router=express.Router()

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/user", jwtAuth, getUser);
router.get("/logout", jwtAuth, logout);

module.exports=router;
