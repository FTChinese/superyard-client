import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ReaderAccount, IWxProfile, IFtcProfile } from 'src/app/data/schema/reader';
import { zip } from 'rxjs';
import { AccountKind } from 'src/app/data/schema/enum';
import { ReaderService } from 'src/app/data/service/reader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError, serviceNames } from 'src/app/data/schema/request-result';
import { ToastService } from 'src/app/shared/service/toast.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  account: ReaderAccount;
  showCreateForm = false;

  constructor(
    private route: ActivatedRoute,
    private readerService: ReaderService,
    private toast: ToastService,
  ) { }

  get isFtc(): boolean {
    return (this.account && this.account.ftcId) ? true : false;
  }

  get hasWechat(): boolean {
    return !!(this.account && this.account.unionId);
  }

  get hasMember(): boolean {
    return !!(this.account && this.account.membership.tier);
  }

  get isStripe(): boolean {
    return this.hasMember && this.account.membership.payMethod === 'stripe';
  }

  get isIAP(): boolean {
    return this.hasMember && this.account.membership.payMethod === 'apple';
  }

  get isB2B(): boolean {
    return this.hasMember && this.account.membership.payMethod === 'b2b';
  }

  ngOnInit(): void {
    zip(this.route.data, this.route.paramMap)
      .pipe(
        switchMap(([data, params]) => {
          const kind = data.kind as AccountKind;
          const id = params.get('id');

          if (kind === 'ftc') {
            return this.readerService.loadFtcAccount(id);
          } else {
            return this.readerService.loadWxAccount(id);
          }
        })
      )
      .subscribe({
        next: data => {
          console.log(data);

          this.account = data;
        },
        error: (err: HttpErrorResponse) => {

          const errRes = new RequestError(err, serviceNames.reader);

          this.toast.error(errRes.message);
        }
      });
  }

  loadFtcProfile() {
    this.readerService.loadFtcProfile(this.account.ftcId)
      .subscribe({
        next: (data: IFtcProfile) => {
          console.log(data);
        },
        error: err => {
          console.log(err);
        }
      });
  }

  loadWxUserInfo() {
    if (!this.hasWechat) {
      return;
    }

    this.readerService.loadWxProfile(this.account.unionId)
    .subscribe({
      next: (data: IWxProfile) => {
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
