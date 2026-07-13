const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add employee name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please add email'],
      unique: true
    },
    phone: {
      type: String,
      default: ''
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: false
    },
    designation: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'terminated'],
      default: 'active'
    },
    dateOfJoining: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', EmployeeSchema);
