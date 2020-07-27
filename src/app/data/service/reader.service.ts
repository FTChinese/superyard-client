import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AccountKind } from 'src/app/data/schema/enum';
import { FtcAccount, ReaderAccount, IFtcProfile, IActivity, IWxProfile, IWxLogin } from 'src/app/data/schema/reader';
import { ReaderSearchParam } from '../schema/form-data';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  private membershipIdSource = new Subject<string>();

  // Child subscribe to it.
  membershipId = this.membershipIdSource.asObservable();

  // Parent pass the membership id.
  modifyMembership(id: string) {
    this.membershipIdSource.next(id);
  }

  constructor(private http: HttpClient) { }

  search(p: ReaderSearchParam): Observable<FtcAccount[]> {
    return this.http.get<FtcAccount[]>(
      '/api/search/reader',
      {
        params: {
          q: p.q,
          kind: p.kind
        }
      }
    );
  }

  loadFtcAccount(id: string): Observable<ReaderAccount> {
    return this.http.get<ReaderAccount>(`/api/readers/ftc/${id}`);
  }

  loadFtcProfile(id: string): Observable<IFtcProfile> {
    return this.http.get<IFtcProfile>(`/api/readers/ftc/${id}/profile`);
  }

  loadActivties(id: string): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(`/api/readers/ftc/${id}/activities`);
  }

  loadWxAccount(id: string): Observable<ReaderAccount> {
    return this.http.get<ReaderAccount>(`/api/readers/wx/${id}`);
  }

  loadWxProfile(id: string): Observable<IWxProfile> {
    return this.http.get<IWxProfile>(`/api/readers/wx/${id}/profile`);
  }

  loadWxLogin(id: string): Observable<IWxLogin[]> {
    return this.http.get<IWxLogin[]>(`/api/readers/wx/${id}/login`);
  }
}
