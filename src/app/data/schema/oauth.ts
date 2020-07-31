import { ApiKeyKind } from './enum';

export interface OAuthApp {
  name: string;
  slug: string;
  repoUrl: string;
  description: string | null;
  homeUrl: string | null;
  callbackUrl: string | null;
  clientId: string;
  clientSecret: string; // client id and secret are generated on server
  isActive: boolean; // Any new app is active by default unless it is deleted alter.
  createdAt: string; // The creation time
  updatedAt: string;
  ownedBy: string; // The current loggedin user's name.
}

// Access token / Personal access key returned from server.
export interface AccessToken {
  id: number;
  token: string;
  isActive: boolean;
  expiresIn: number | null;
  kind: ApiKeyKind;
  description: string | null;
  clientId: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  lastUsedAt: string | null;
}
