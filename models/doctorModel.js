const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone no is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
    },
    feePerConsultation: {
      type: Number,
      required: [true, "Fee per visit is required"],
    },
    status:{
      type: String,
      default: "pending"
    },
    timing: {
      type: Object,
      required: [true, "Working timing is required"],
    },
  },
  { timestamps: true}
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
