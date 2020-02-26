import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { IRelease, IReleaseBase } from '../models/android';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AndroidService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * @description Checks whether the specified version exists in database.
   */
  tagExists(tag: string): Observable<boolean> {
    return this.http.get(`/api/android/exists/${tag}`, { observe: 'response'} )
      .pipe(
        switchMap(resp => of(resp.status === 204))
      );
  }

  /**
   * @description Create a new android release.
   */
  createRelease(release: IReleaseBase): Observable<boolean> {
    return this.http.post<IReleaseBase>(
      '/api/android/releases',
      release,
      {
        observe: 'response',
      }
    )
    .pipe(
      switchMap(resp => of(resp.status === 204))
    );
  }

  /**
   * @description Show all android releases.
   */
  listReleases(): Observable<IRelease[]> {
    return this.http.get<IRelease[]>('/api/android/releases');
  }

  loadRelease(tag: string): Observable<IRelease> {
    return this.http.get<IRelease>(`/api/android/releases/${tag}`);
  }

  updateRelease(release: IReleaseBase): Observable<boolean> {
    return this.http.post<IReleaseBase>(
      `/api/android/releases/${release.versionName}`,
      release,
      {
        observe: 'response'
      }
    )
    .pipe(
      switchMap(resp => of(resp.status === 204))
    );
  }

  removeRelease(tag: string): Observable<boolean> {
    return this.http.delete(
      `/api/android/releases/${tag}`,
      { observe: 'response' }
    ).pipe(
      switchMap(resp => of(resp.status === 204))
    );
  }
}
