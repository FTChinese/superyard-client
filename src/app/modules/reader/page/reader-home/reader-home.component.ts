import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AccountKind } from 'src/app/data/schema/enums';
import { HttpErrorResponse } from '@angular/common/http';
import { IBaseReader, IReaderAccount } from 'src/app/data/schema/reader';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SearchService } from 'src/app/shared/service/search.service';
import { RequestError } from 'src/app/data/schema/request-result';
import { AccountItem } from '../../account-item';
import { ReaderService } from 'src/app/data/service/reader.service';

@Component({
  selector: 'app-reader-home',
  templateUrl: './reader-home.component.html',
  styleUrls: ['./reader-home.component.scss'],
  providers: [SearchService],
})
export class ReaderHomeComponent {

  notFound = false;
  accountList: AccountItem[];

  errMsg: string;

  account: Observable<IReaderAccount>;

  constructor(
    private readerService: ReaderService,
    private searchService: SearchService,
  ) {
    this.searchService.valueSubmitted$.pipe(
      switchMap(control => {
        console.log(control);

        const invalid = Validators.email(control);

        const kind: AccountKind = (invalid && invalid.email)
          ? 'wechat'
          : 'ftc';

        console.log('Searching account kind: ' + kind);

        return this.readerService.search(control.value, kind);
      })
    ).subscribe({
      next: (data: IBaseReader[]) => {
        console.log(data);
        this.account = null;
        this.accountList = data.map(val => {
          if (val.kind === 'ftc') {
            return {
              id: val.ftcId,
              name: val.email,
              kind: val.kind,
            };
          }
          return {
            id: val.unionId,
            name: val.nickname,
            kind: val.kind
          };
        });
      },
      error: (errResp: HttpErrorResponse) => {
        console.log(errResp);

        const err = RequestError.fromResponse(errResp);

        if (err.notFound) {
          this.accountList = [];
          return;
        }

        this.errMsg = err.message;
      }
    });
  }

  loadAccount(item: AccountItem) {
    this.account = (item.kind === 'ftc')
      ? this.readerService.loadFtcAccount(item.id)
      : this.readerService.loadWxAccount(item.id);
  }
}
