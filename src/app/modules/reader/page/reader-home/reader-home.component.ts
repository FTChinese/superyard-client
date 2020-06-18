import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AccountKind } from 'src/app/data/schema/enum';
import { HttpErrorResponse } from '@angular/common/http';
import { IBaseReader, IReaderAccount } from 'src/app/data/schema/reader';
import { Observable } from 'rxjs';
import { RequestError } from 'src/app/data/schema/request-result';
import { AccountItem } from '../../account-item';
import { ReaderService } from 'src/app/data/service/reader.service';
import { ControlOptions } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';
import { SearchForm } from 'src/app/data/schema/form-data';

@Component({
  selector: 'app-reader-home',
  templateUrl: './reader-home.component.html',
  styleUrls: ['./reader-home.component.scss'],
})
export class ReaderHomeComponent {

  searchControl: ControlOptions = {
    value: '',
    key: 'keyword',
    validators: [Validators.required, Validators.maxLength(64)],
    placeholder: 'Email or Wechat nickname',
    desc: 'Search a reader by email or Wechat nickname'
  };

  button: Button = Button
    .primary()
    .setName('Search');

  disableSearch = false;

  accountList: AccountItem[];

  errMsg: string;

  account: Observable<IReaderAccount>;

  constructor(
    private readerService: ReaderService,
  ) {
  }

  onSearch(data: string) {
    this.disableSearch = true;

    const search: SearchForm = JSON.parse(data);

    const isEmail = search.keyword.indexOf('@') > 0;
    const kind: AccountKind = isEmail
      ? 'ftc'
      : 'wechat';

    console.log('Searching account kind: ' + kind);

    this.readerService.search(search.keyword, kind)
      .subscribe({
        next: (reader: IBaseReader[]) => {
          console.log(reader);
          this.account = null;
          this.accountList = reader.map(val => {
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

          this.disableSearch = false;

          if (err.notFound) {
            this.errMsg = 'No result';
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
