import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReaderService } from '../reader.service';
import { switchMap } from 'rxjs/operators';
import { IReaderAccount, IWxProfile, IFtcProfile } from 'src/app/models/reader';
import { TableRow } from '../account-item';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  currentReader: IReaderAccount;
  accountRows: TableRow[];
  memberRows: TableRow[];
  ftcProfileRows: TableRow[];
  wxProfileRows: TableRow[];

  constructor(
    private route: ActivatedRoute,
    private readerService: ReaderService,
  ) { }

  get isFtc(): boolean {
    return (this.currentReader && this.currentReader.ftcId) ? true : false;
  }

  get hasWechat(): boolean {
    return !!(this.currentReader && this.currentReader.unionId);
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return this.readerService.loadFtcAccount(id)
      })
    )
    .subscribe({
      next: data => {
        console.log(data);
        this.currentReader = data;
        this.accountRows = [
          { head: 'Ftc ID', data: data.ftcId },
          { head: 'Wechat Union ID', data: data.unionId },
          { head: 'Stripe Customer ID', data: data.stripeId },
          { head: 'Email', data: data.email },
          { head: 'User name', data: data.userName },
          { head: 'Wechat nickname', data: data.nickname },
          { head: 'Kind', data: data.kind },
        ];
        this.memberRows = [
          { head: 'ID', data: data.membership.id },
          { head: 'Tier', data: data.membership.tier },
          { head: 'Billing Cycle', data: data.membership.cycle },
          { head: 'Expiration Date', data: data.membership.expireDate },
          { head: 'Payment Method', data: data.membership.payMethod },
          { head: 'Stripe Subscription ID', data: data.membership.stripeSubId },
          { head: 'Auto Renwal', data: `${data.membership.autoRenewal}` },
          { head: 'Apple Original Transaction ID', data: data.membership.appleSubId },
          { head: 'VIP', data: `${data.membership.vip}`},
        ]
      },
      error: err => {
        console.log(err)
      }
    });
  }

  loadFtcProfile() {
    this.readerService.loadFtcProfile(this.currentReader.ftcId)
      .subscribe({
        next: (data: IFtcProfile) => {
          console.log(data);
          this.ftcProfileRows = Object.entries(data).map(([key, value]) => {
            return {
              head: key,
              data: value,
            }
          })
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

    this.readerService.loadWxProfile(this.currentReader.unionId)
    .subscribe({
      next: (data: IWxProfile) => {
        console.log(data);
        this.wxProfileRows = Object.entries(data).map(([key, value]) => {
          return {
            head: key,
            data: value,
          }
        })
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
