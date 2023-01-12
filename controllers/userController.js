const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register callback
const registerController = async (req, res) => {
   try {
        const existingUser = await userModel.findOne({email: req.body.email});
        if (existingUser) {
            return res.status(200).send({success: false, message:`User already exists.`});
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        req.body.password = hash;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({success:true, message:`Registered successfully`});
   } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: `Register Error: ${error.message}`});
   }
};

// login callback
const loginController = async (req, res) => {
     try {
          const user = await userModel.findOne({email:req.body.email});
          if(!user) {
               return res.status(200).send({success:false, message:'User not found!'});
          }
          const isMatch = await bcrypt.compare(req.body.password, user.password);
          if(!isMatch) {
               return res.status(200).send({success:false, message:'Invalid email or Password!'});
          }
          const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'1d'});
          res.status(200).send({success:true, message: 'Login Successfully!', token});
     } catch (error) {
          console.log(error);
          res.status(500).send({success:false, message: `Error in Login CTRL ${error.message}`});
     }
};

// Auth Controller
const authController = async (req, res) => {
     try {
       const user = await userModel.findById({ _id: req.body.userId });
       user.password = undefined;
       if (!user) {
         return res.status(200).send({
           message: "user not found",
           success: false,
         });
       } else {
         res.status(200).send({
           success: true,
           data: user,
         });
       }
     } catch (error) {
       console.log(error);
       res.status(500).send({
         message: "auth error",
         success: false,
         error,
       });
     }
};

module.exports = {loginController, registerController, authController};