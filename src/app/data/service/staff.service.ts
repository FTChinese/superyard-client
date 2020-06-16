import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials, PasswordsUpdater } from '../schema/form-data';
import { Observable, of } from 'rxjs';
import { JWTAccount, IProfile, IProfileForm } from '../schema/staff';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  login(credentials: Credentials): Observable<JWTAccount> {
    return this.http
      .post<JWTAccount>(
        '/api/login',
        credentials,
      );
  }

  loadProfile(): Observable<IProfile> {
    return this.http.get<IProfile>(`/api/settings/profile`);
  }

  updateProfile(formData: IProfileForm): Observable<boolean> {
    return this.http.patch<IProfileForm>(
        `/api/staff/${this.auth.account.id}`,
        formData,
        {
          observe: 'response',
        }
      )
      .pipe(
        switchMap(resp => of(resp.status === 204))
      );
  }

  changePassword(pws: PasswordsUpdater): Observable<boolean> {
    return this.http.patch<PasswordsUpdater>(
        `/api/account/password`,
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
