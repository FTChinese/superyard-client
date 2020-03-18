import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IApiApp, IApiAccess } from '../models/oauth';
import { switchMap } from 'rxjs/operators';

type AppForm = Pick<IApiApp, 'name' | 'slug' | 'repoUrl' | 'description' | 'homeUrl' | 'callbackUrl'>;

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

  createApp(app: AppForm): Observable<boolean> {
    return this.http
      .post<AppForm>(
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

  updateApp(clientId: string, app: AppForm): Observable<boolean> {
    return this.http.post<AppForm>(
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

  listAppTokens(clientId: string): Observable<IApiAccess[]> {
    return this.http.get<IApiAccess[]>(this.urlTokens);
  }
}
