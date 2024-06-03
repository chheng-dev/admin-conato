// roles.js

const roles = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

const permissions = {
  VIEW_DASHBOARD: 'view_dashboard',
  EDIT_PRODUCT: 'edit_product',
};

const rolePermissions = {
  [roles.ADMIN]: [permissions.VIEW_DASHBOARD, permissions.EDIT_PRODUCT],
  [roles.USER]: [permissions.EDIT_PRODUCT],
  [roles.GUEST]: [],
};

export { roles, permissions, rolePermissions };
