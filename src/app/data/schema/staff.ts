export interface BaseAccount {
  userName: string;
  email: string | null;
  displayName: string | null;
  department: string | null;
  groupMembers: number;
}

export interface StaffAccount extends BaseAccount {
  id: string;
  isActive: boolean;
}

export interface JWTAccount extends StaffAccount {
  expiresAt: number;
  token: string;
}

export interface Profile extends StaffAccount {
  createdAt: string | null;
  deactiveatedAt: string | null;
  updatedAt: string | null;
  lastLoginAt: string | null;
  lastLoginIp: string | null;
}

export type ProfileForm = Pick<StaffAccount, 'email' | 'displayName'>;
