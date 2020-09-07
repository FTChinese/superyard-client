import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SandboxUserForm, SandboxPasswordForm } from '../schema/sandbox-form';
import { Observable, of } from 'rxjs';
import { FtcAccount, ReaderAccount } from 'src/app/data/schema/reader';
import { switchMap } from 'rxjs/operators';
import { Paging, pagingParams } from 'src/app/shared/widget/paging';

@Injectable({
  providedIn: 'root'
})
export class SandboxService {

  private basePath = '/api/sandbox';

  constructor(
    private http: HttpClient
  ) {}

  createUser(user: SandboxUserForm): Observable<FtcAccount> {
    return this.http.post<FtcAccount>(
      this.basePath,
      user,
    );
  }

  listUsers(p: Paging): Observable<FtcAccount[]> {
    return this.http.get<FtcAccount[]>(this.basePath, {
      params: pagingParams(p)
    });
  }

  loadAccount(id: string): Observable<ReaderAccount> {
    return this.http.get<ReaderAccount>(`${this.basePath}/${id}`);
  }

  changePassword(id: string, data: SandboxPasswordForm): Observable<boolean> {
    return this.http.patch<boolean>(
      `${this.basePath}/${id}/password`,
      data,
      {
        observe: 'response'
      }
    )
    .pipe(switchMap(resp => of(resp.status === 204)));
  }

  // updateMembership(id: string, data: SandboxMemberForm): Observable<Membership> {
  //   return this.http.patch<Membership>(
  //     `${this.basePath}/${id}/membership`,
  //     data
  //   );
  // }

  // deleteMembership(id: string): Observable<boolean> {
  //   return this.http.delete<boolean>(
  //     `${this.basePath}/${id}/membership`,
  //     {
  //       observe: 'response'
  //     }
  //   )
  //   .pipe(switchMap(resp => of(resp.status === 204)));
  // }
}
