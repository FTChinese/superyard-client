import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AndroidRelease } from '../schema/android';
import { ReleaseForm } from '../schema/form-data';
import { PagedData } from '../schema/paged-data';
import { Paging, pagingParams } from 'src/app/shared/widget/paging';

@Injectable({
  providedIn: 'root'
})
export class AndroidService {

  constructor(
    private http: HttpClient,
  ) { }

  ghLatest(): Observable<AndroidRelease> {
    return this.http.get<AndroidRelease>('/api/android/gh/latest');
  }

  ghRelease(tag: string): Observable<AndroidRelease> {
    return this.http.get<AndroidRelease>(`/api/android/gh/tags/${tag}`);
  }
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
  createRelease(release: ReleaseForm): Observable<boolean> {
    return this.http.post<ReleaseForm>(
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
  listReleases(p: Paging): Observable<PagedData<AndroidRelease>> {
    return this.http.get<PagedData<AndroidRelease>>('/api/android/releases', {
      params: pagingParams(p)
    });
  }

  loadRelease(tag: string): Observable<AndroidRelease> {
    return this.http.get<AndroidRelease>(`/api/android/releases/${tag}`);
  }

  updateRelease(release: ReleaseForm): Observable<boolean> {
    return this.http.patch<ReleaseForm>(
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
