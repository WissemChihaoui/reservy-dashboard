// src/auth/roles.js
export const ROLES = {
  ADMIN: 'admin',
  OWNER: 'owner',
  STAFF: 'staff',
  REFERRAL: 'referral'
};

export const ROLE_HIERARCHY = {
  [ROLES.ADMIN]: 4,
  [ROLES.OWNER]: 3,
  [ROLES.STAFF]: 2,
  [ROLES.REFERRAL]: 1
};

export const hasPermission = (userRole, requiredRole) => ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];