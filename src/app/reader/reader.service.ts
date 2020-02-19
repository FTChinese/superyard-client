import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBaseReader, IReaderAccount, IFtcProfile, IActivity, IWxProfile, IWxLogin } from '../models/reader';
import { Observable } from 'rxjs';
import { AccountKind } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  constructor(private http: HttpClient) { }

  search(q: string, kind: AccountKind): Observable<IBaseReader[]> {
    return this.http.get<IBaseReader[]>('/api/search/reader', {
      params: {
        q,
        kind
      }
    });
  }

  loadFtcAccount(id: string): Observable<IReaderAccount> {
    return this.http.get<IReaderAccount>(`/api/readers/ftc/${id}`);
  }

  loadFtcProfile(id: string): Observable<IFtcProfile> {
    return this.http.get<IFtcProfile>(`/api/readers/ftc/${id}/profile`);
  }

  loadActivties(id: string): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(`/api/readers/ftc/${id}/activities`);
  }

  loadWxAccount(id: string): Observable<IReaderAccount> {
    return this.http.get<IReaderAccount>(`/api/readers/wx/${id}`);
  }

  loadWxProfile(id: string): Observable<IWxProfile> {
    return this.http.get<IWxProfile>(`/api/readers/wx/${id}/profile`);
  }

  loadWxLogin(id: string): Observable<IWxLogin[]> {
    return this.http.get<IWxLogin[]>(`/api/readers/wx/${id}/login`);
  }
}
