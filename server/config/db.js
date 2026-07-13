const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/erp-portal');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    // Do not crash the entire process during setup/testing in environments where MongoDB might not be running yet.
    console.log('Server is running, but database connection is pending. Make sure MongoDB is started.');
  }
};

module.exports = connectDB;
