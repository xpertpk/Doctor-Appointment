const doctorModel = require('../models/doctorModel');

// Get Doctor Profile Contoller
const getDoctorProfileController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({userId: req.body.userId});
        res.status(200).send({
            success: true,
            message: 'Doctor details fetch successfully!',
            data: doctor
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in fetching doctor details"
        });
    }
}

// Update Doctor Profile Controller
const updateDoctorProfileController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate(
          { userId: req.body.userId },
          req.body
        );
        res.status(201).send({
          success: true,
          message: "Doctor Profile Updated successfully!",
          data: doctor,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Doctor Profile Update issue",
          error,
        });
      }
}

//get single docotor
const getDoctorByIdController = async (req, res) => {
    try {
      const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
      res.status(200).send({
        success: true,
        message: "Sigle Doc Info Fetched",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Erro in Single docot info",
      });
    }
  };
  

module.exports = {getDoctorProfileController, updateDoctorProfileController, getDoctorByIdController}