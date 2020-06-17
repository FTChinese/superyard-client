import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AccountKind } from 'src/app/data/schema/enums';
import { HttpErrorResponse } from '@angular/common/http';
import { IBaseReader, IReaderAccount } from 'src/app/data/schema/reader';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RequestError } from 'src/app/data/schema/request-result';
import { AccountItem } from '../../account-item';
import { ReaderService } from 'src/app/data/service/reader.service';
import { ControlOptions } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { SearchForm } from 'src/app/data/schema/form-data';

@Component({
  selector: 'app-reader-home',
  templateUrl: './reader-home.component.html',
  styleUrls: ['./reader-home.component.scss'],
  providers: [FormService],
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

  accountList: AccountItem[];

  errMsg: string;

  account: Observable<IReaderAccount>;

  constructor(
    private readerService: ReaderService,
    private formService: FormService,
  ) {
    this.formService.formSubmitted$.pipe(
      switchMap(data => {
        const search: SearchForm = JSON.parse(data);

        const isEmail = search.keyword.indexOf('@') > 0;
        const kind: AccountKind = isEmail
          ? 'wechat'
          : 'ftc';

        console.log('Searching account kind: ' + kind);

        return this.readerService.search(search.keyword, kind);
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

        this.formService.sendError(err);

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