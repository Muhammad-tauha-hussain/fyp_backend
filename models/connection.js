const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected successfully');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1); // Stop the server if DB connection fails
    }
};

// Enable debugging (Optional)
mongoose.set('debug', true);

module.exports = connectDB;
