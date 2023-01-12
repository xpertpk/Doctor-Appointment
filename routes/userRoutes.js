const express = require("express");
const { 
    loginController, 
    registerController, 
    authController
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
router.post("/geyUserData", authMiddleware, authController)

module.exports = router;