import { Component, OnInit } from '@angular/core';
import { AccountKind } from 'src/app/data/schema/enum';
import { HttpErrorResponse } from '@angular/common/http';
import { JoinedAccount } from 'src/app/data/schema/reader';
import { RequestError } from 'src/app/data/schema/request-result';
import { ReaderService } from '../../service/reader.service';
import { ReaderSearchParam } from 'src/app/data/schema/form-data';
import { ToastService } from 'src/app/shared/service/toast.service';

@Component({
  selector: 'app-reader-home',
  templateUrl: './reader-home.component.html',
  styleUrls: ['./reader-home.component.scss'],
})
export class ReaderHomeComponent implements OnInit {

  accounts: JoinedAccount[];
  disableSearch = false;

  get notFound(): boolean {
    return this.accounts && this.accounts.length === 0;
  }

  constructor(
    private readerService: ReaderService,
    private toast: ToastService
  ) {
  }

  ngOnInit(): void {
  }

  onKeyword(k: string) {
    const isEmail = k.indexOf('@') > 0;
    const kind: AccountKind = isEmail
      ? 'ftc'
      : 'wechat';

    this.searchAccount({
      q: k,
      kind,
    });
  }

  searchAccount(param: ReaderSearchParam) {
    this.readerService.search(param)
      .subscribe({
        next: (accounts: JoinedAccount[]) => {
          this.accounts = accounts;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          const errRes = new RequestError(err);
          this.toast.error(errRes.message);
        }
      });
  }
}
