import { Product, Plan } from './product';
import { AndroidRelease } from './android';
import { AccountKind } from './enum';
import { Membership } from './reader';
import { AccessToken, OAuthApp } from './oauth';

export interface AccountFields {
  id: string;
  userName: string;
  password: string;
  email: string;
  oldPassword: string;
  confirmPassword: string;
  token: string;
  sourceUrl: string;
}

export type Credentials = Pick<AccountFields, 'userName' | 'password'>;

export type EmailForm = Pick<AccountFields, 'email'>;

export type PasswordResetForm = Pick<AccountFields, 'password' | 'confirmPassword'>;

export type PasswordResetLetterReq = EmailForm & {
  sourceUrl?: string
};

export type PasswordUpdateForm = Pick<AccountFields, 'oldPassword' | 'password' | 'confirmPassword'>;

export type PasswordResetter = Pick<AccountFields, 'token' | 'password'>;
export type PasswordsUpdater = Pick<AccountFields, 'oldPassword' | 'password'>;

export interface SearchForm {
  keyword: string;
}

// The parameters used when searching a reader.
export interface ReaderSearchParam {
  q: string;
  kind: AccountKind;
}

export type MemberForm = Pick<Membership, 'tier' | 'cycle' | 'expireDate' | 'payMethod'>;

type ProductBase = Pick<Product, 'tier' | 'heading' | 'smallPrint'>;

// Deprecated
export type ProductForm = ProductBase & {
  description: string;
};

export type CreateProductForm = Pick<Product, 'tier' | 'heading' | 'smallPrint'> & {
  description: string | null;
  plans: Plan[] | null;
};

export type EditProductForm = Pick<Product, 'heading' | 'smallPrint'> & {
  description: string | null;
};

// The data fields when creating a pricing plan.
// A plan always belongs to a certain product.
export type PlanForm = Pick<Plan, 'price' | 'cycle'>;

// The request data to create a plan.
// Since a plan always belongs to a product, we get
// the tier and productId from an existing Product instance.
export type PlanReq = Pick<Plan, 'price' | 'tier' | 'cycle'> & {
  productId: string;
};

export type ReleaseForm = Omit<AndroidRelease, 'createdAt' | 'updatedAt'>;

export type OAuthAppForm = Pick<OAuthApp, 'name' | 'slug' | 'repoUrl' | 'description' | 'homeUrl' | 'callbackUrl'>;
export type PersonalKeyForm = Pick<AccessToken, 'description'>;
export type AppTokenReq = Pick<AccessToken, 'description' | 'clientId'>;
