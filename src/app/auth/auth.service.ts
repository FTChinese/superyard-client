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

  get isLoggedIn(): boolean {
    return !!this.account;
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
        tap(val => this.account = val)
      );
  }

  logout(): void {
    this.account = null;
  }
}
