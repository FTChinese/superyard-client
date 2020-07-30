import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/service/auth.service';
import { OAuthApp, AppBase, AccessToken, TokenBase } from 'src/app/data/schema/oauth';

@Injectable({
  providedIn: 'root'
})
export class OAuthService {

  private urlApps = '/api/oauth/apps';
  private urlTokens = '/api/oauth/keys';

  private urlAppOf(clientId: string): string {
    return `${this.urlApps}/${clientId}`;
  }

  private urlTokenOf(id: number): string {
    return `${this.urlTokens}/${id}`;
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  listApps(): Observable<OAuthApp[]> {
    return this.http.get<OAuthApp[]>(this.urlApps);
  }

  createApp(app: AppBase): Observable<boolean> {
    return this.http
      .post<AppBase>(
        this.urlApps,
        app,
        {
          observe: 'response',
        }
      )
      .pipe(
        switchMap(resp => of(resp.status === 204))
      );
  }

  loadApp(clientId: string): Observable<OAuthApp> {
    return this.http.get<OAuthApp>(this.urlAppOf(clientId));
  }

  updateApp(clientId: string, app: AppBase): Observable<boolean> {
    return this.http.post<AppBase>(
      this.urlAppOf(clientId),
      app,
      {
        observe: 'response',
      }
    )
    .pipe(
      switchMap(resp => of(resp.status === 204))
    );
  }

  deactivateApp(clientId: string): Observable<boolean> {
    return this.http.delete(
      this.urlAppOf(clientId),
      {
        observe: 'response',
      }
    )
    .pipe(
      switchMap(resp => of(resp.status === 204))
    );
  }

  listAppTokens(clientId: string): Observable<AccessToken[]> {
    return this.http.get<AccessToken[]>(
      this.urlTokens,
      {
        params: new HttpParams().set('clientId', clientId),
      }
    );
  }

  // Create an access token for an app or person.
  createToken(token: TokenBase): Observable<boolean> {
    token.createdBy = this.authService.account.userName;

    return this.http.post<TokenBase>(
        this.urlTokens,
        token,
        {
          observe: 'response',
        }
      )
      .pipe(
        switchMap(resp => of(resp.status === 204))
      );
  }

  listPersonalKeys(): Observable<AccessToken[]> {
    return this.http.get<AccessToken[]>(
      this.urlTokens,
      {
        params: new HttpParams().set('staff_name', this.authService.account.userName),
      }
    );
  }
}
