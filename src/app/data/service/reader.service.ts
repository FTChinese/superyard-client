import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FtcAccount, ReaderAccount, IFtcProfile, IActivity, IWxProfile, IWxLogin, Order, Membership } from 'src/app/data/schema/reader';
import { ReaderSearchParam, MemberForm } from '../schema/form-data';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

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

  loadOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`/api/orders/${id}`);
  }

  confirmOrder(id: string): Observable<boolean> {
    return this.http.patch(
      `/api/orders/${id}`,
      null,
      {
        observe: 'response'
      }
    )
    .pipe(
      switchMap(resp => of(resp.status === 204))
    );
  }

  findMembership(userId: string): Observable<Membership> {
    return this.http.get<Membership>(`/api/search/membership/${userId}`);
  }

  // Refresh membership after modification.
  refreshMembership(compoundId: string): Observable<Membership> {
    return this.http.get<Membership>(`/api/memberships/${compoundId}`);
  }

  createMembership(m: Membership): Observable<boolean> {
    return this.http.post(
      '/api/memberships',
      m,
      {
        observe: 'response'
      }
    )
    .pipe(switchMap(resp => of(resp.status === 204)));
  }

  updateMembership(compoundId: string, m: MemberForm): Observable<boolean> {
    return this.http.patch(
      `/api/memberships/${compoundId}`,
      m,
      {
        observe: 'response',
      }
    )
    .pipe(switchMap(resp => of(resp.status === 204)));
  }
}
