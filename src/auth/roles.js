import { paths } from "src/routes/paths";

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

export const ROLE_PATH = {
  admin: paths.admin.root,
  owner: paths.owner.root,
  staff: paths.staff.root,
  referral: paths.referral.root
}