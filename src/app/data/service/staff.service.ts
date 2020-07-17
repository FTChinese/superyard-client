import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials, PasswordsUpdater, PasswordResetLetterReq, PasswordResetter, EmailForm } from '../schema/form-data';
import { Observable, of } from 'rxjs';
import { JWTAccount, Profile, ProfileForm } from '../schema/staff';
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

  forgotPassword(data: PasswordResetLetterReq): Observable<boolean> {
    return this.http
      .post<PasswordResetLetterReq>(
        '/api/password-reset/letter',
        data,
        {
          observe: 'response'
        }
      )
      .pipe(
        switchMap(resp => of(resp.status === 204))
      );
  }

  verifyPwResetToken(token: string): Observable<EmailForm> {
    return this.http
      .get<EmailForm>(`/api/password-reset/tokens/${token}`);
  }

  resetPassword(resetter: PasswordResetter): Observable<boolean> {
    return this.http.post<PasswordResetter>(
      '/api/password-reset',
      resetter,
      {
        observe: 'response'
      }
    )
    .pipe(switchMap(resp => of(resp.status === 204)));
  }

  loadProfile(): Observable<Profile> {
    return this.http.get<Profile>(`/api/settings/profile`);
  }

  updateProfile(formData: ProfileForm): Observable<boolean> {
    return this.http.patch<ProfileForm>(
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
