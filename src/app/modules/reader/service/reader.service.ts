import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { JoinedAccount, ReaderAccount, IFtcProfile, IActivity, IWxProfile, IWxLogin } from 'src/app/data/schema/reader';
import { Membership } from 'src/app/data/schema/membership';
import { Order } from 'src/app/data/schema/order';
import { ReaderSearchParam } from '../../../data/schema/form-data';
import { switchMap } from 'rxjs/operators';
import { FtcMemberForm } from '../schema/sandbox-form';
import { AccountKind } from 'src/app/data/schema/enum';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  constructor(private http: HttpClient) { }

  search(p: ReaderSearchParam): Observable<JoinedAccount[]> {
    return this.http.get<JoinedAccount[]>(
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

  loadActivities(id: string): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(`/api/readers/ftc/${id}/activities`);
  }

  loadWxAccount(id: string): Observable<ReaderAccount> {
    return this.http.get<ReaderAccount>(`/api/readers/wx/${id}`);
  }

  loadAccount(id: string, kind: AccountKind): Observable<ReaderAccount> {
    switch (kind) {
      case 'ftc':
        return this.loadFtcAccount(id);
      case 'wechat':
        return this.loadWxAccount(id);
    }
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

  upsertFtcMember(data: FtcMemberForm): Observable<Membership> {
    return this.http.post<Membership>(
      '/api/memberships',
      data
    );
  }

  deleteMember(id: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `/api/memberships/${id}`,
      {
        observe: 'response'
      }
    )
    .pipe(switchMap(resp => of(resp.status === 204)));
  }
}
