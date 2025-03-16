const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const crypto = require('crypto'); // Correct way in CommonJS
const emailTemplate = require('../middleware/EmailTemplate')

const client = new OAuth2Client(process.env.CLIENT_ID);

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

exports.googleLogin = async (req, res) => {
    console.log("Received Token:", req.body.token);  // ✅ Log token

    const { token } = req.body;
    if (!token) {
        console.error("No token received in backend.");
        return res.status(400).json({ error: "No token received" });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
        });

        console.log("Google Payload:", ticket.getPayload());  // ✅ Log Google user data

        const { name, email, sub: googleId } = ticket.getPayload();
        let user = await UserModel.findOne({ email });

        if (!user) {
            user = new UserModel({ name, email, googleId });
            await user.save();
        }

        const currentUser = { name: user.name, email: user.email };
        const jwttoken = await jwt.sign(currentUser, process.env.SECRET_KEY);
        
        console.log("JWT Token:", jwttoken);  // ✅ Log JWT token

        console.log("Reached Here");
        res.status(200).json({
            message: "Registered successfully with Google",
            currentUser: currentUser,
            token: jwttoken,
        });

    } catch (err) {
        console.error("Google Token Verification Failed:", err.message);
        res.status(500).json({ error: "Google login failed", details: err.message });
    }
};


// Login function
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await UserModel.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json("No record existed");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password Match:', isMatch);
        if (!isMatch) {
            return res.status(400).json("The password is incorrect");
        }

        const currentUser = {
            name: user.name,
            email: user.email
        };
        const token = await jwt.sign(currentUser, process.env.SECRET_KEY);

        console.log('Login done');
        res.status(200).json({
            message: "Login Successfully",
            token: token,
            currentUser: currentUser
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.register = async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;

    if (!name || !email || !password || !confirmpassword) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmpassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        // Check if the email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await hashPassword(password);
        console.log('Hashed Password:', hashedPassword);

        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Registered successfully", data: newUser });
    } catch (err) {
        res.status(500).json({ error: "Registration failed", details: err.message });
    }
};




exports.forgotPassword = async (req, res) => {
    try {
        const userEmail = req.body.email;
        console.log('Request Body:', req.body); // Add this line
        if (!userEmail) {
            return res.status(400).json({
                status: 400,
                message: "Email is required"
            });
        }

        const userData = await UserModel.findOne({ email: userEmail });
        if (!userData) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        const token = crypto.randomBytes(32).toString('hex');
        userData.resetToken = token;
        userData.resetTokenExpiration = Date.now() + 3600000; // 1 hour expiration
        await userData.save();
        const resetLink = `http://localhost:3000/reset-password/${token}`; // Point to the frontend route
        const to = userEmail;
        const subject = 'Reset Password Request';
        const html = emailTemplate.resetPasswordEmailTemplate
        (resetLink);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: html
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({
                    status: 500,
                    message: "Error sending email",
                    error: error.message
                });
            }
            res.status(200).json({
                status: 200,
                message: "Reset link sent to your email",
                email: userEmail // Include the email in the response
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
};


// Reset password function

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const userData = await UserModel.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() }
        });

        if (!userData) {
            return res.status(404).json({
                status: 404,
                message: "Invalid or expired token"
            });
        }

        const userHashPassword = await hashPassword(password);
        userData.password = userHashPassword;
        userData.resetToken = undefined;
        userData.resetTokenExpiration = undefined;
        await userData.save();

        return res.status(200).json({
            status: 200,
            message: "Password reset successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
};