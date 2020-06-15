import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AccountKind } from 'src/app/data/schema/enums';
import { IBaseReader, IReaderAccount, IFtcProfile, IActivity, IWxProfile, IWxLogin } from 'src/app/data/schema/reader';

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

  search(q: string, kind: AccountKind): Observable<IBaseReader[]> {
    return this.http.get<IBaseReader[]>('/api/readers/search', {
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