const express = require('express');
const { 
    getDoctorProfileController, 
    updateDoctorProfileController,
    getDoctorByIdController
} = require('../controllers/doctorController');
const authMiddleWare = require('../middlewares/authMiddleware');
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getDoctorInfo", authMiddleWare, getDoctorProfileController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleWare, updateDoctorProfileController);

//POST  GET SINGLE DOC INFO
router.post("/getDoctorById", authMiddleWare, getDoctorByIdController);

module.exports = router;