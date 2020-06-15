import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/service/auth.service';
import { IApiApp, IAppBase, IAccessToken, ITokenBase } from 'src/app/data/schema/oauth';

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

  listApps(): Observable<IApiApp[]> {
    return this.http.get<IApiApp[]>(this.urlApps, {
      headers: this.authService.authHeader,
    });
  }

  createApp(app: IAppBase): Observable<boolean> {
    return this.http
      .post<IAppBase>(
        this.urlApps,
        app,
        {
          observe: 'response',
          headers: this.authService.authHeader,
        }
      )
      .pipe(
        switchMap(resp => of(resp.status === 204))
      );
  }

  loadApp(clientId: string): Observable<IApiApp> {
    return this.http.get<IApiApp>(this.urlAppOf(clientId), {
      headers: this.authService.authHeader,
    });
  }

  updateApp(clientId: string, app: IAppBase): Observable<boolean> {
    return this.http.post<IAppBase>(
      this.urlAppOf(clientId),
      app,
      {
        observe: 'response',
        headers: this.authService.authHeader,
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
        headers: this.authService.authHeader,
      }
    )
    .pipe(
      switchMap(resp => of(resp.status === 204))
    );
  }

  listAppTokens(clientId: string): Observable<IAccessToken[]> {
    return this.http.get<IAccessToken[]>(
      this.urlTokens,
      {
        params: new HttpParams().set('clientId', clientId),
        headers: this.authService.authHeader,
      }
    );
  }

  // Create an access token for an app or person.
  createToken(token: ITokenBase): Observable<boolean> {
    token.createdBy = this.authService.account.userName;

    return this.http.post<ITokenBase>(
        this.urlTokens,
        token,
        {
          observe: 'response',
          headers: this.authService.authHeader,
        }
      )
      .pipe(
        switchMap(resp => of(resp.status === 204))
      );
  }

  listPersonalKeys(): Observable<IAccessToken[]> {
    return this.http.get<IAccessToken[]>(
      this.urlTokens,
      {
        params: new HttpParams().set('staff_name', this.authService.account.userName),
        headers: this.authService.authHeader,
      }
    );
  }
}
