const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// const cors = require("cors");

// dotenv config
dotenv.config();

// mongodb connection
connectDB();

// rest object
const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));


// port
const port = process.env.PORT || 8080;

// const whitelist = ["http://localhost:3000"]
// const corsOptions = {
//     origin: function (origin, callback) {
//       if (!origin || whitelist.indexOf(origin) !== -1) {
//         callback(null, true)
//       } else {
//         callback(new Error("Not allowed by CORS"))
//       }
//     },
//     credentials: true,
// }
// app.use(cors(corsOptions))

// listen port
app.listen(port, ()=> {
    console.log(
        `Server running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgMagenta
    )
})