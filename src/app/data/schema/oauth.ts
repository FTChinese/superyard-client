import { ApiKeyKind } from './enum';

// IAppBase contains user submitted data only.
// Backedn will add extra meta fields.
export interface AppBase {
  name: string;
  slug: string;
  repoUrl: string;
  description: string | null;
  homeUrl: string | null;
  callbackUrl: string | null;
}

export interface OAuthApp extends AppBase {
  clientId: string;
  clientSecret: string; // client id and secret are generated on server
  isActive: boolean; // Any new app is active by default unless it is deleted alter.
  createdAt: string; // The creation time
  updatedAt: string;
  ownedBy: string; // The current loggedin user's name.
}

// Form data submitted to create access token for an app.
export interface TokenBase {
  description: string | null;
  createdBy: string;
  clientId: string | null;
}

// Access token / Personal access key returned from server.
export interface AccessToken extends TokenBase {
  id: number;
  token: string;
  kind: ApiKeyKind;
  isActive: boolean;
  expiresIn: number | null;
  createdAt: string;
  updatedAt: string;
  lastUsedAt: string | null;
}
