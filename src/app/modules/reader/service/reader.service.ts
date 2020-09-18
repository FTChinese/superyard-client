import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { JoinedAccount, ReaderAccount, IFtcProfile, IActivity, IWxProfile, IWxLogin } from 'src/app/data/schema/reader';
import { Membership } from 'src/app/data/schema/membership';
import { Order } from 'src/app/data/schema/order';
import { ReaderSearchParam } from '../../../data/schema/form-data';
import { switchMap } from 'rxjs/operators';
import { FtcMemberForm, FtcNewMemberReq } from '../schema/ftc-form';
import { AccountKind } from 'src/app/data/schema/enum';
import { Paging, pagingParams } from 'src/app/shared/widget/paging';
import { IAPSubs, IAPSubsList } from 'src/app/data/schema/iap';
import { IAPForm } from '../schema/iap-form';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  private readonly basePath = '/api/readers';

  constructor(private http: HttpClient) { }

  search(p: ReaderSearchParam): Observable<JoinedAccount[]> {
    return this.http.get<JoinedAccount[]>(
      `${this.basePath}/search`,
      {
        params: {
          q: p.q,
          kind: p.kind
        }
      }
    );
  }

  loadFtcAccount(id: string): Observable<ReaderAccount> {
    return this.http.get<ReaderAccount>(`${this.basePath}/ftc/${id}`);
  }

  loadFtcProfile(id: string): Observable<IFtcProfile> {
    return this.http.get<IFtcProfile>(`${this.basePath}/ftc/${id}/profile`);
  }

  loadActivities(id: string): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(`${this.basePath}/ftc/${id}/activities`);
  }

  loadWxAccount(id: string): Observable<ReaderAccount> {
    return this.http.get<ReaderAccount>(`${this.basePath}/wx/${id}`);
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
    return this.http.get<IWxProfile>(`${this.basePath}/wx/${id}/profile`);
  }

  loadWxLogin(id: string): Observable<IWxLogin[]> {
    return this.http.get<IWxLogin[]>(`${this.basePath}/wx/${id}/login`);
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

  /**
   * @description Create a new membership for a user if not having one,
   * or update if already present.
   */
  createFtcMember(data: FtcNewMemberReq): Observable<Membership> {
    return this.http.post<Membership>(
      '/api/memberships',
      data
    );
  }

  updateFtcMember(compoundID: string, data: FtcMemberForm): Observable<Membership> {
    return this.http.patch<Membership>(`/api/memberships/${compoundID}`, data);
  }

  /**
   * @description Delete a membership.
   */
  deleteFtcMember(compoundID: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `/api/memberships/${compoundID}`,
      {
        observe: 'response'
      }
    )
    .pipe(switchMap(resp => of(resp.status === 204)));
  }


  /**
   * @description Show a list of Apple IAP subscription.
   * @param p - Pagination parameters.
   */
  listIAP(p: Paging): Observable<IAPSubsList> {
    return this.http.get<IAPSubsList>(`/api/iap`, {
      params: pagingParams(p)
    });
  }

  refreshIAP(originalTxId: string): Observable<IAPSubs> {
    return this.http.patch<IAPSubs>(`/api/iap/${originalTxId}`, null);
  }

  loadIAPMember(origTxId): Observable<Membership> {
    return this.http.get<Membership>(`/api/iap/${origTxId}/link`);
  }

  /**
   * @description Link an IAP subscription to an ftc account.
   * @param ftcId - the ftc user id
   * @param to - the form data to collect original transaction id.
   */
  linkIAP(ftcId: string, to: IAPForm): Observable<Membership> {
    return this.http.put<Membership>(`/api/iap/${to.originalTxId}/link`, {
      ftcId,
    });
  }

  unlinkIAP(ftcId: string, from: IAPForm): Observable<boolean> {
    return this.http.delete<boolean>(`/api/iap/${from.originalTxId}/link`, {
      observe: 'response',
      params: {
        ftc_id: ftcId,
      }
    })
    .pipe(switchMap(resp => of(resp.status === 204)));
  }
}
