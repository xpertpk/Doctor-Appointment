const express = require("express");
const { 
    loginController, 
    registerController, 
    authController,
    applyDoctorController
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

//Auth || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController)

module.exports = router;