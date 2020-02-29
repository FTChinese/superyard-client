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

export interface Profile extends ICMSAccount {
  createdAt: string
  deactiveatedAt: string;
  updatedAt: string;
  lastLoginAt: string;
  lastLoginIp: string;
}
