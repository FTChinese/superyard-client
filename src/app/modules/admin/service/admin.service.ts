import { HttpClient } from '@angular/common/http';
import { FunctionCall } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { FtcAccount } from 'src/app/data/schema/reader';
import { StaffAccount } from 'src/app/data/schema/staff';
import { Paging, pagingParams } from 'src/app/shared/widget/paging';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private basePath = '/api/admin';

  constructor(
    private http: HttpClient
  ) { }

  listStaff(p: Paging): Observable<StaffAccount[]> {
    return this.http.get<StaffAccount[]>(this.basePath + '/staff', {
      params: pagingParams(p)
    });
  }

  listVip(p: Paging): Observable<FtcAccount[]> {
    return this.http.get<FtcAccount[]>(this.basePath + '/vip', {
      params: pagingParams(p)
    });
  }

  grantVip(ftcId: string): Observable<FtcAccount> {
    return this.http.put<FtcAccount>(`${this.basePath}/vip/${ftcId}`, null);
  }

  revokeVip(ftcId: string): Observable<FtcAccount> {
    return this.http.delete<FtcAccount>(`${this.basePath}/vip/${ftcId}`);
  }
}
