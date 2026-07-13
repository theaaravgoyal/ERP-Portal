const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add module name'],
      unique: true,
      trim: true
    },
    code: {
      type: String,
      required: [true, 'Please add module unique code'],
      unique: true,
      trim: true
    },
    version: {
      type: String,
      default: '1.0.0'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    description: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Module', ModuleSchema);
