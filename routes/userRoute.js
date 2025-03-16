
const express = require('express');
const router = express.Router();
const authController = require('../controllers/userController');
const { validateRequest, registerSchema, loginSchema, forgotSchema, resetPasswordSchema } = require('../middleware/JioValidation');

router.post('/login', validateRequest(loginSchema), authController.login);
router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/forgot-password', validateRequest(forgotSchema), authController.forgotPassword);
router.post('/reset-password/:token', validateRequest(resetPasswordSchema), authController.resetPassword);
router.post('/google-login', authController.googleLogin );


module.exports = router;

