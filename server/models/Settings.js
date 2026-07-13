const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: [true, 'Please add config key'],
      unique: true,
      trim: true
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'Please add config value']
    },
    group: {
      type: String,
      default: 'general'
    },
    description: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', SettingsSchema);
