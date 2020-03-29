import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin, StaffAccount, IProfile, IPasswords, IProfileForm } from '../models/staff';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  account: StaffAccount | null = null;
  redirectUrl: string;
  private storeKey = 'syCurrentUser';

  get isLoggedIn(): boolean {
    if (this.account) {
      return true;
    }
    const val = localStorage.getItem(this.storeKey);
    if (val) {
      this.account = JSON.parse(val);
      return true;
    }
    return false;
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

  constructor(
    private http: HttpClient,
  ) {}

  login(credentials: ILogin): Observable<StaffAccount> {
    return this.http
      .post<StaffAccount>(
        '/api/login',
        credentials,
      )
      .pipe(
        tap(val => {
          this.account = val;
          localStorage.setItem(this.storeKey, JSON.stringify(val));
        })
      );
  }

  logout(): void {
    this.account = null;
    localStorage.removeItem(this.storeKey);
  }

  loadProfile(): Observable<IProfile> {
    return this.http.get<IProfile>(`/api/staff/${this.account.id}`);
  }

  updateProfile(formData: IProfileForm): Observable<boolean> {
    return this.http.patch<IProfileForm>(
        `/api/staff/${this.account.id}`,
        formData,
        {
          observe: 'response',
        }
      )
      .pipe(
        switchMap(resp => of(resp.status === 204))
      );
  }

  changePassword(pws: IPasswords): Observable<boolean> {
    return this.http.patch<IPasswords>(
        `/api/staff/${this.account.id}/password`,
        pws,
        {
          observe: 'response',
        }
      )
      .pipe(
        switchMap(resp => of(resp.status === 204))
      );
  }
}
