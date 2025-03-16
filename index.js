// // const express = require('express');
// // const cors = require('cors');
// // const connectDB = require('./models/connection');
// // const userController = require('./controllers/userController');

// // const app = express();
// // app.use(express.json());
// // app.use(cors());

// // // Connect to MongoDB
// // connectDB();

// // // Routes
// // app.post('/login', userController.loginUser);
// // app.post('/register', userController.registerUser);
// // app.post('/forgot-password', userController.forgotPassword);
// // app.post('/reset-password/:token', userController.resetPassword);

// // // Start the server
// // const PORT = process.env.PORT || 4000;
// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });

// const express = require("express");
// const mongoose = require('mongoose');
// const connectDB = require('./models/connection');
// const cors = require("cors");
// const authRoutes = require('./routes/userRoute');
// require('dotenv').config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// connectDB();

// // Use the auth routes
// app.use('/api', authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// const express = require('express');
// const connectDB = require('./models/connection'); 
// require('dotenv').config();
// const PORT = process.env.PORT || 5000;

// const app = express();
// app.use(express.json());

// // Database connection function
// connectDB();

// // Routes Declaration
// const userRouter = require('./routes/userRoute');
// app.use('/api', userRouter);

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
// import predictRoute from './routes/predictRoute'
const predictRoute = require("./routes/predictRoute");
const connectDB = require('./models/connection');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000", // Allow frontend origin
  credentials: true
}));
// Set Cross-Origin-Opener-Policy header
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    next();
  });

  app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });

// Database connection function
connectDB();

// Routes Declaration
const userRouter = require('./routes/userRoute');
app.use('/api', userRouter);
app.use('/api', predictRoute)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
