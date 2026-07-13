const Permission = require('../models/Permission');
const RolePermission = require('../models/RolePermission');

class PermissionRepository {
  async findPermissionsByRoleId(roleId) {
    const mappings = await RolePermission.find({ role: roleId }).populate('permission');
    // Extract and return the actual permission objects, filtering out any unresolved/null references
    return mappings
      .map(m => m.permission)
      .filter(p => p !== null);
  }

  async createPermission(data) {
    return await Permission.create(data);
  }

  async createRolePermission(roleId, permissionId) {
    return await RolePermission.create({ role: roleId, permission: permissionId });
  }

  async deletePermissions() {
    return await Permission.deleteMany({});
  }

  async deleteRolePermissions() {
    return await RolePermission.deleteMany({});
  }
}

module.exports = new PermissionRepository();
