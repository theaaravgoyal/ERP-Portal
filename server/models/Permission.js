const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a permission name'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'Please add a permission code'],
      unique: true,
      trim: true,
    },
    module: {
      type: String,
      required: [true, 'Please specify the module this permission belongs to'],
    },
    route: {
      type: String,
      required: [true, 'Please specify the client route for this module'],
    },
    icon: {
      type: String,
      default: 'LayoutDashboard',
    },
    description: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Permission', PermissionSchema);
