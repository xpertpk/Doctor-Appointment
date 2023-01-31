const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/appointmentModel');
const moment = require('moment');

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

// Auth Controller
const applyDoctorController = async (req, res) => {
     try {
       const newDoctor = await doctorModel({...req.body, status: "pending"});
       await newDoctor.save();
       const adminUser = await userModel.findOne({isAdmin: true});
       const notification = adminUser.notification;
       notification.push({
          type: 'apply-doctor-account',
          userId: newDoctor.userId,
          message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account.`,
          data: {
               doctorId: newDoctor._id,
               name: newDoctor.firstName + " " + newDoctor.lastName,
               onClickPath: '/admin/doctor/'
          }
       });
       await userModel.findByIdAndUpdate(adminUser._id, {notification});
     res.status(201).send({
          success: true,
          message: 'Doctor account applied successfully'
     });
     } catch (error) {
       console.log(error);
       res.status(500).send({
         message: "Error while applying for doctor",
         success: false,
         error,
       });
     }
};

// Notifications Controller
const getAllNotificationsController = async (req, res) => {
     try {
          const user = await userModel.findOne({_id: req.body.userId});
          const seennotification = user.seennotification;
          const notification = user.notification;
          seennotification.push(...notification);
          user.notification = [];
          user.seennotification = notification;
          const updatedUser = await user.save();
          res.status(200).send({
               success: true,
               message: "All notifications mark as read.",
               data: updatedUser
          });
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success:false,
               message: 'Error in notifications',
               error
          });
     }
}

// delete notifications
const deleteAllNotificationController = async (req, res) => {
     try {
       const user = await userModel.findOne({ _id: req.body.userId });
       user.notification = [];
       user.seennotification = [];
       const updatedUser = await user.save();
       updatedUser.password = undefined;
       res.status(200).send({
         success: true,
         message: "Notifications Deleted successfully",
         data: updatedUser,
       });
     } catch (error) {
       console.log(error);
       res.status(500).send({
         success: false,
         message: "unable to delete all notifications",
         error,
       });
     }
};

// Get ALL Doctors
const getDoctorsController = async (req, res) => {
     try {
          const doctors = await doctorModel.find({status:'approved'});
          res.status(200).send({
               success: true,
               message:'All doctors fetch successfully!',
               data: doctors
          });
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               message: "unable to fetch all doctors",
               error
          });
     }
}

// Book Appointment Controller
const bookAppointmentController = async (req, res) => {
     try {
          req.body.date = moment(req.body.date, "YYYY-MM-DD").toISOString();
          req.body.time = moment(req.body.time, "HH:mm").add(5, 'hours').toISOString();
          req.body.status = "pending";
          const newAppointment = await appointmentModel(req.body);
          await newAppointment.save();
          const user = await userModel.findOne({_id: req.body.doctorInfo.userId});
          user.notification.push({
               type: 'New-Appointment-request',
               message: `A new appointment request from ${req.body.userInfo.name}`,
               onClickPath: '/user/appointments'
          });
          await user.save();
          res.status(200).send({
               success: true,
               message: 'Appointment book successfully!',
               newAppointment
          });
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               message: "Error while booking appointment",
               error
          })
     }
}

//Booking Availability Controller
const bookAvailabilityController = async (req, res) => {
     console.log(req.body)
     try {
          const date = moment(req.body.date, "YYYY-MM-DD").toISOString();
          const fromTime = moment(req.body.time, "HH:mm").add(4, 'hours').add(45, 'minutes').toISOString();
          const toTime = moment(req.body.time, "HH:mm").add(5,'hours').toISOString();
          const doctorId = req.body.doctorId;
          console.log(date, fromTime, toTime)
          const appointments = await appointmentModel.find({doctorId,
               date,
               time: {
                    $gte:fromTime, 
                    $lte:toTime
               }
          })
          if(appointments.length > 0) {
               return res.status(200).send({
                    message: 'Appointment not available at this time',
                    success: true,
                    available: 'no'
               });
          } else {
               return res.status(200).send({
                    message: 'Appointment Available!',
                    success: true,
                    available: 'yes'
               });
          }
          console.log(appointments)
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               message: 'Error in Booking!',
               error
          });
     }
}

module.exports = {loginController, registerController, authController, applyDoctorController, getAllNotificationsController, deleteAllNotificationController, getDoctorsController, bookAppointmentController, bookAvailabilityController};