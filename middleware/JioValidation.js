const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

const passwordComplexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
};

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().label('Name'),
    email: Joi.string().email().required().label('Email'),
    password: PasswordComplexity(passwordComplexityOptions).required().label('Password'),
    confirmpassword: Joi.any().valid(Joi.ref('password')).required().label('Confirm Password').messages({
        'any.only': 'Passwords do not match',
    }),
    otp: Joi.string().optional().label('OTP'),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password')
});

const forgotSchema = Joi.object({
    email: Joi.string().email().required().label('Email'),
});



const resetPasswordSchema = Joi.object({
    password: PasswordComplexity(passwordComplexityOptions).required().label('Password'),
    
});

const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
};

module.exports = {
    validateRequest,
    registerSchema,
    loginSchema,
    forgotSchema,
    resetPasswordSchema
};
