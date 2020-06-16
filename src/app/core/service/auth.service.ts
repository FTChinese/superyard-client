import { Injectable } from '@angular/core';
import { JWTAccount } from '../../data/schema/staff';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  account: JWTAccount | null = null;
  redirectUrl: string;
  private storeKey = 'sy_user';

  loggedIn(account: JWTAccount) {
    this.account = account;
    localStorage.setItem(this.storeKey, JSON.stringify(account));
  }

  get isLoggedIn(): boolean {
    if (!this.account) {
      const val = localStorage.getItem(this.storeKey);
      if (val) {
        this.account = JSON.parse(val);
      }
    }

    if (!this.account) {
      return false;
    }

    return true;
  }

  get isExpired(): boolean {
    if (!this.account) {
      return true;
    }
    return (Date.now() / 1000) > this.account.expiresAt;
  }

  get authToken(): string | null {
    if (!this.account) {
      return null;
    }
    return `Bearer ${this.account.token}`;
  }

  get displayName(): string {
    if (!this.account) {
      return '';
    }

    if (this.account.displayName) {
      return this.account.displayName;
    }

    return this.account.userName;
  }

  logout(): void {
    this.account = null;
    localStorage.removeItem(this.storeKey);
  }
}
