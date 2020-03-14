import { ApiKeyUsage } from './enums';

export interface IApiApp {
  name: string;
  slug: string;
  clientId: string;
  clientSecret: string;
  repoUrl: string;
  description: string | null;
  homeUrl: string | null;
  callbackUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  ownedBy: string;
}

export interface IApiAccess {
  id: number;
  token: string;
  usage: ApiKeyUsage;
  isActive: boolean;
  expiresIn: number | null;
  clientId: string | null;
  description: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  lastUsedAt: string | null;
}
