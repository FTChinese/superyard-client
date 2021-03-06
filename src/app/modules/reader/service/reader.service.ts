import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { JoinedAccount, ReaderAccount, IFtcProfile, IActivity, IWxProfile, IWxLogin, FtcAccount } from 'src/app/data/schema/reader';
import { Membership, MemberSnapshot } from 'src/app/data/schema/membership';
import { AliPayload, ConfirmationResult, Order, UnconfirmedOrder, WxPayload } from 'src/app/data/schema/order';
import { ReaderSearchParam } from '../../../data/schema/form-data';
import { switchMap } from 'rxjs/operators';
import { FtcMemberForm, FtcNewMemberReq } from '../schema/ftc-form';
import { AccountKind } from 'src/app/data/schema/enum';
import { Paging, pagingParams, userPagingParam } from 'src/app/shared/widget/paging';
import { IAPSubs, IAPSubsList } from 'src/app/data/schema/iap';
import { IAPForm } from '../schema/iap-form';
import { PagedData } from 'src/app/data/schema/paged-data';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  private readonly basePath = '/api/readers';
  private readonly whBase = '/api/webhook';
  private readonly orderBase = '/api/orders';
  private readonly snapBase = '/api/snapshots';

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

  listOrders(account: FtcAccount, p: Paging): Observable<PagedData<Order>> {

    return this.http.get<PagedData<Order>>(`${this.orderBase}`, {
      params: userPagingParam(account, p),
    });
  }

  verifyPayment(orderId: string): Observable<ConfirmationResult> {
    return this.http.patch<ConfirmationResult>(
      `/api/orders/${orderId}`,
      null,
    );
  }

  aliWebhookPayload(orderId: string): Observable<AliPayload[]> {
    return this.http.get<AliPayload[]>(`/api/orders/${orderId}/webhook/alipay`);
  }

  wxWebhookPayload(orderId: string): Observable<WxPayload[]> {
    return this.http.get<WxPayload[]>(`/api/orders/${orderId}/webhook/wechat`);
  }

  listAliUnconfirmed(p: Paging): Observable<PagedData<UnconfirmedOrder>> {
    return this.http.get<PagedData<UnconfirmedOrder>>(`${this.whBase}/failure/alipay`, {
      params: pagingParams(p)
    });
  }

  listWxUnconfirmed(p: Paging): Observable<PagedData<UnconfirmedOrder>> {
    return this.http.get<PagedData<UnconfirmedOrder>>(`${this.whBase}/failure/wechat`, {
      params: pagingParams(p)
    });
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

  listMemberSnapshot(account: FtcAccount, p: Paging): Observable<PagedData<MemberSnapshot>> {

    return this.http.get<PagedData<MemberSnapshot>>(`${this.snapBase}`, {
      params: userPagingParam(account, p),
    });
  }

  /**
   * @description Show a list of Apple IAP subscription.
   * @param p - Pagination parameters.
   */
  listIAP(ftcId: string, p: Paging): Observable<IAPSubsList> {
    return this.http.get<IAPSubsList>(`/api/iap`, {
      headers: {
        'X-User-Id': ftcId,
      },
      params: pagingParams(p)
    });
  }

  refreshIAP(originalTxId: string): Observable<IAPSubs> {
    return this.http.patch<IAPSubs>(`/api/iap/${originalTxId}`, null);
  }

  loadIAPMember(origTxId): Observable<Membership> {
    return this.http.get<Membership>(`/api/iap/${origTxId}/membership`);
  }

  /**
   * @description Link an IAP subscription to an ftc account.
   * @param ftcId - the ftc user id
   * @param to - the form data to collect original transaction id.
   */
  linkIAP(ftcId: string, to: IAPForm): Observable<Membership> {
    return this.http.post<Membership>(`/api/iap/${to.originalTxId}/link`, {
      ftcId,
    });
  }

  unlinkIAP(ftcId: string, form: IAPForm): Observable<boolean> {
    return this.http.post<boolean>(`/api/iap/${form.originalTxId}/unlink`, {
      ftcId,
    }, {
      observe: 'response',
    })
    .pipe(switchMap(resp => of(resp.status === 204)));
  }
}
