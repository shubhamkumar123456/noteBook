const express = require('express')
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser= require('../middleware/fetchuser')

const JWT_secret = "iamagoodb$oy"


//Route1: create a user using post "/api/auth"  no login required

router.post('/createuser', [
    body('name', "enter a valid name").isLength({ min: 3 }),
    body('email', "enter a valid email").isEmail(),
    body('password', "password must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    let success= false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    //check whether the user with this email exist already
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success,error:"sorry a user with this email is already exists"})
        } else {
            const salt=await bcrypt.genSalt(10)
         const secPass=await bcrypt.hash(req.body.password,salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password:secPass
            })
            const data={
                user:{
                    id:user.id
                }
            }
            const authtoken=jwt.sign(data,JWT_secret)
            success=true;
            res.json({success,authtoken})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

//Route2: authenticating a user using: post "/api/auth/createuser" .  no login required
router.post('/login', [
    body('email', "enter a valid email").isEmail(),
    body('password', "password can not be blank").exists()
], async (req, res) => {
    let success= false;
    const errors = validationResult(req);
   
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}=req.body;
    try{
        let user =await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({error:"please try to login with correct credentials"})
        }

        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({error:"please try to login with correct credentials"})
        }

        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_secret);
        success=true;
        res.json({success,authtoken})
    }catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
});

//  Route3: Get logged in user details : POST "/api/aut/getuser", Login required
router.post('/getuser',fetchuser, async(req,res)=>{
    try {
        userId=req.user.id;
        const user=await User.findById(userId).select("-password")
        console.log(user)
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }
})
module.exports = router