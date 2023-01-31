const express = require("express");
const { 
    loginController, 
    registerController, 
    authController,
    applyDoctorController,
    getAllNotificationsController,
    deleteAllNotificationController,
    getDoctorsController,
    bookAppointmentController,
    bookAvailabilityController
} = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware");

// express Router
const router = express.Router();

// routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController)

//Appy Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController)

//Get All Notifications || POST
router.post("/get-all-notifications", authMiddleware, getAllNotificationsController)

//Notifiaction  Doctor || POST
router.post("/delete-all-notification", authMiddleware, deleteAllNotificationController);

//Get All Doctors
router.get("/getDoctors", authMiddleware, getDoctorsController);

//Book Appointment
router.post('/book-appointment', authMiddleware, bookAppointmentController);

//Booking Availability
router.post('/booking-availability', authMiddleware, bookAvailabilityController);
  

module.exports = router;