// encryption.js
const bcrypt = require('bcrypt');

// Hash a password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Compare a password with a hashed password
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  };

module.exports = {
    hashPassword,
    comparePassword
};
