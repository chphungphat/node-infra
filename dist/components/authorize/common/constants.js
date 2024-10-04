"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnforcerDefinitions = exports.FixedUserRoles = void 0;
class FixedUserRoles {
}
exports.FixedUserRoles = FixedUserRoles;
_a = FixedUserRoles;
FixedUserRoles.SUPER_ADMIN = '999-super-admin';
FixedUserRoles.ADMIN = '998-admin';
FixedUserRoles.FULL_AUTHORIZE_ROLES = [_a.SUPER_ADMIN, _a.ADMIN];
class EnforcerDefinitions {
}
exports.EnforcerDefinitions = EnforcerDefinitions;
EnforcerDefinitions.ACTION_EXECUTE = 'execute';
EnforcerDefinitions.ACTION_READ = 'read';
EnforcerDefinitions.ACTION_WRITE = 'write';
EnforcerDefinitions.PREFIX_USER = 'user';
EnforcerDefinitions.PREFIX_ROLE = 'role';
EnforcerDefinitions.PTYPE_POLICY = 'p';
EnforcerDefinitions.PTYPE_GROUP = 'g';
//# sourceMappingURL=constants.js.map