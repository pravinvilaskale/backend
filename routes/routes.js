const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { jwtkey } = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
let session = require('express-session')
const nodemailer = require("nodemailer");

//for signup route
router.post('/signup',async(req,res)=>{
    
    const { email, password,firstName,lastName,otp } = req.body;
    //const {name} = req.body;
    let verify=0,token="";
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cssproject715@gmail.com', // generated ethereal user
            pass: 'css123456', // generated ethereal password
        },
    });
    let info = await transporter.sendMail({
        from: '"QR Code Shopping App 🛍️" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Verification Code ✔️", // Subject line
        text: ``, // plain text body
        html: `<br><b>Your OTP is ${otp}</b>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    //console.log(session)
    //console.log("req send",req.body)
    try{
    const user = new User({email,password,firstName,lastName,otp,verify,token});
    console.log(user)
    const newuser = await  user.save();
    console.log(newuser)
    const token1 = jwt.sign({ userId: user._id }, jwtkey, { expiresIn: 86400})
        console.log("token",token1)
         res.json({ token: token1 })
    
    const find = { email: email };
    const update = { token: token1 };

    let up = await User.findOneAndUpdate(find, update);
    console.log(up.token)
    
    }
    catch(err)
    {
        return res.send(err)
    }
})

//for signin route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if(!email||!password){
        return res.send({msg:"nullemailpass"})
    }
    const user = await User.findOne({email})
    console.log(user)
    if (user) {
        //return res.status(422).send({ error: "must provide email or password" })
        try{
        const pass = await user.comparePassword(password);
        if(pass)
        {
            res.send({msg:"success",token:user.token})
            //console.log("Password is correct.")
        }
        else
        {
            res.send({msg:"wrongPass"})
        }
        //const token = jwt.sign({userId:user._id},jwtkey)
        }
        catch(err){
            return res.send({msg: "wrongPass"})
        }
    }
    else
    {
        res.send({"msg":"wrongEmail"})
    }
    
})

router.post('/otp',async(req,res)=>{
    const {email,otp} = req.body
    if(!otp)
    {
        res.send({msg:"otpnull"})
    }
    else
    {
    const user = await User.findOne({ email })
    try{
    const databaseOtp = user.otp;
    console.log(databaseOtp)
    if(otp == databaseOtp)
    {
        res.send({msg:"success"})
    }
    else
    {
        res.send({msg:"wrongOtp"})
    }
    }catch
    {
        res.send({ msg: "wrongOtp" })
    }
    }
})

router.get('/',(req,res)=>{
    res.send("Hello");
})

module.exports = router
