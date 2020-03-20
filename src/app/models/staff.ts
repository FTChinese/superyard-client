export interface ILogin {
  userName: string;
  password: string;
}

export interface ICMSAccount {
  id: string;
  userName: string;
  email: string | null;
  isActive: boolean;
  displayName: string | null;
  department: string | null;
  groupMembers: number;
}

export interface IProfile extends ICMSAccount {
  createdAt: string | null;
  deactiveatedAt: string | null;
  updatedAt: string | null;
  lastLoginAt: string | null;
  lastLoginIp: string | null;
}

export type IProfileForm = Pick<ICMSAccount, 'email' | 'displayName'>;

export interface IPasswords {
  oldPassword: string; // Old password for validation
  newPassword: string; // new password
}
