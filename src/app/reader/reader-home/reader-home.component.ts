import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountKind } from 'src/app/models/enums';
import { ReaderService } from '../reader.service';
import { AccountItem } from '../account-item';
import { HttpErrorResponse } from '@angular/common/http';
import { IBaseReader, IReaderAccount } from 'src/app/models/reader';
import { Observable } from 'rxjs';
import { parseErrorResponse } from 'src/app/models/errors';

@Component({
  selector: 'app-reader-home',
  templateUrl: './reader-home.component.html',
  styleUrls: ['./reader-home.component.scss']
})
export class ReaderHomeComponent implements OnInit {

  notFound = false;
  accountList: AccountItem[];

  searchControl = new FormControl('', [Validators.required, Validators.email]);

  errMsg: string;

  account: Observable<IReaderAccount>;

  constructor(
    private readerService: ReaderService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.searchControl.invalid && this.searchControl.errors.required) {
      this.errMsg = 'Search value required';
      return;
    }

    const kind: AccountKind = (this.searchControl.errors && this.searchControl.errors.email) ? 'wechat' : 'ftc';

    console.log('Searching account kind: ' + kind);

    this.readerService.search(this.searchControl.value, kind)
    .subscribe({
      next: (data: IBaseReader[]) => {
        console.log(data);
        this.account = null;
        this.accountList = data.map(val => {
          if (val.kind === 'ftc') {
            return {
              id: val.ftcId,
              name: val.email,
              kind: val.kind,
            }
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

        const err = parseErrorResponse(errResp);

        if (err.notFound) {
          this.accountList = [];
          return;
        }

        this.errMsg = err.message;
      }
    });
  }

  loadAccount(item: AccountItem) {
    this.account = (item.kind == "ftc")
      ? this.readerService.loadFtcAccount(item.id)
      : this.readerService.loadWxAccount(item.id);
  }
}
