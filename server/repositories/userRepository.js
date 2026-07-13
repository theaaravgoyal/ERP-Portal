const User = require('../models/User');

class UserRepository {
  async findByEmail(email, selectPassword = false) {
    let query = User.findOne({ email }).populate('role');
    if (selectPassword) {
      query = query.select('+password');
    }
    return await query;
  }

  async findById(id) {
    return await User.findById(id).populate('role');
  }

  async create(userData) {
    return await User.create(userData);
  }

  async deleteMany() {
    return await User.deleteMany({});
  }
}

module.exports = new UserRepository();
