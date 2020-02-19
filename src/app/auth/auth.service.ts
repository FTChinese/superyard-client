import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin, ICMSAccount } from '../models/staff';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  account: ICMSAccount | null = null;
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

  constructor(
    private http: HttpClient,
  ) {}

  login(credentials: ILogin): Observable<ICMSAccount> {
    return this.http
      .post<ICMSAccount>(
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
}
