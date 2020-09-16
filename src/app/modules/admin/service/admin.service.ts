import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { PagedData } from 'src/app/data/schema/paged-data';
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

  listVip(p: Paging): Observable<PagedData<FtcAccount>> {
    return this.http.get<PagedData<FtcAccount>>(this.basePath + '/vip', {
      params: pagingParams(p)
    });
  }

  findFtcAccount(email: string): Observable<FtcAccount> {
    return this.http.get<FtcAccount>(
      `/api/readers/ftc`,
      {
        params: {
          q: email
        }
      }
    );
  }

  grantVip(ftcId: string): Observable<FtcAccount> {
    return this.http.put<FtcAccount>(`${this.basePath}/vip/${ftcId}`, null);
  }

  revokeVip(ftcId: string): Observable<FtcAccount> {
    return this.http.delete<FtcAccount>(`${this.basePath}/vip/${ftcId}`);
  }
}
