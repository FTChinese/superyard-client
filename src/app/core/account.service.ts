import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICMSAccount, ILogin } from '../models/staff';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  login(credentials: ILogin): Observable<ICMSAccount> {
    return this.http
      .post<ICMSAccount>(
        '/api/login',
        credentials,
      );
  }
}
