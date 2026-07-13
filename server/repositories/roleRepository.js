const Role = require('../models/Role');

class RoleRepository {
  async findByName(name) {
    return await Role.findOne({ name });
  }

  async findById(id) {
    return await Role.findById(id);
  }

  async create(roleData) {
    return await Role.create(roleData);
  }

  async deleteMany() {
    return await Role.deleteMany({});
  }
}

module.exports = new RoleRepository();
