import { Component, OnInit } from '@angular/core';
import { AccountKind } from 'src/app/data/schema/enum';
import { HttpErrorResponse } from '@angular/common/http';
import { JoinedAccount } from 'src/app/data/schema/reader';
import { RequestError } from 'src/app/data/schema/request-result';
import { ReaderService } from 'src/app/data/service/reader.service';
import { buildSearchOpts } from 'src/app/shared/widget/control';
import { SearchForm, ReaderSearchParam } from 'src/app/data/schema/form-data';
import { FormService } from 'src/app/shared/service/form.service';
import { ToastService } from 'src/app/shared/service/toast.service';

@Component({
  selector: 'app-reader-home',
  templateUrl: './reader-home.component.html',
  styleUrls: ['./reader-home.component.scss'],
  providers: [FormService],
})
export class ReaderHomeComponent implements OnInit {

  searchControl = buildSearchOpts('Email or Wechat nickname');

  accounts: JoinedAccount[];

  get notFound(): boolean {
    return this.accounts && this.accounts.length === 0;
  }

  constructor(
    private readerService: ReaderService,
    private formService: FormService,
    private toast: ToastService
  ) {
  }

  ngOnInit(): void {
    this.formService.formSubmitted$.subscribe(data => {
      const search: SearchForm = JSON.parse(data);

      const isEmail = search.keyword.indexOf('@') > 0;
      const kind: AccountKind = isEmail
        ? 'ftc'
        : 'wechat';

      this.searchAccount({
        q: search.keyword,
        kind,
      });
    });
  }

  searchAccount(param: ReaderSearchParam) {
    this.readerService.search(param)
      .subscribe({
        next: (accounts: JoinedAccount[]) => {
          this.formService.enable(true);
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
