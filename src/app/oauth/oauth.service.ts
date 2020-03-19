import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IApiApp, IAccessToken, IAppBase, ITokenBase, IPersonalKey } from '../models/oauth';
import { switchMap } from 'rxjs/operators';
import { ICMSAccount } from '../models/staff';

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

  listApps(): Observable<IApiApp[]> {
    return this.http.get<IApiApp[]>(this.urlApps);
  }

  createApp(app: IAppBase): Observable<boolean> {
    return this.http
      .post<IAppBase>(
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

  loadApp(clientId: string): Observable<IApiApp> {
    return this.http.get<IApiApp>(this.urlAppOf(clientId));
  }

  updateApp(clientId: string, app: IAppBase): Observable<boolean> {
    return this.http.post<IAppBase>(
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

  listAppTokens(clientId: string): Observable<IAccessToken[]> {
    return this.http.get<IAccessToken[]>(this.urlTokens, {
      params: new HttpParams().set('clientId', clientId),
    });
  }

  // Create an access token for an app or person.
  createToken(token: ITokenBase): Observable<boolean> {
    return this.http.post<ITokenBase>(
        this.urlTokens,
        token,
        {
          observe: 'response'
        }
      )
      .pipe(
        switchMap(resp => of(resp.status === 204))
      );
  }

  listPersonalKeys(account: ICMSAccount): Observable<IAccessToken[]> {
    return this.http.get<IAccessToken[]>(this.urlTokens, {
      params: new HttpParams().set('staff_name', account.userName)
    });
  }
}
