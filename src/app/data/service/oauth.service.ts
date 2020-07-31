import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OAuthApp, AccessToken } from 'src/app/data/schema/oauth';
import { PersonalKeyForm, OAuthAppForm, AppTokenReq } from '../schema/form-data';

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
  ) { }

  listApps(): Observable<OAuthApp[]> {
    return this.http.get<OAuthApp[]>(this.urlApps);
  }

  createApp(app: OAuthAppForm): Observable<OAuthApp> {
    return this.http
      .post<OAuthApp>(
        this.urlApps,
        app,
      );
  }

  loadApp(clientId: string): Observable<OAuthApp> {
    return this.http.get<OAuthApp>(this.urlAppOf(clientId));
  }

  updateApp(clientId: string, app: OAuthAppForm): Observable<boolean> {
    return this.http.patch<OAuthAppForm>(
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
        params: new HttpParams().set('client_id', clientId),
      }
    );
  }

  // Create an access token for an app or person.
  createToken(token: AppTokenReq): Observable<AccessToken> {

    return this.http.post<AccessToken>(
        this.urlTokens,
        token,
      );
  }

  listPersonalKeys(): Observable<AccessToken[]> {
    return this.http.get<AccessToken[]>(
      this.urlTokens
    );
  }

  createPersonalKey(key: PersonalKeyForm): Observable<AccessToken> {
    return this.http.post<AccessToken>(
      this.urlTokens,
      key,
    );
  }
}
