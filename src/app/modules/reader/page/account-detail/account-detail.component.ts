import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ReaderAccount, IWxProfile, IFtcProfile } from 'src/app/data/schema/reader';
import { isMember } from 'src/app/data/schema/membership';
import { zip } from 'rxjs';
import { AccountKind } from 'src/app/data/schema/enum';
import { ReaderService } from '../../service/reader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError, serviceNames } from 'src/app/data/schema/request-result';
import { ToastService } from 'src/app/shared/service/toast.service';
import { Link } from 'src/app/shared/widget/link';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { testAccountSuffix } from '../../schema/sandbox-form';

type TabID = 'order' | 'snap' | 'iap';

interface Tab {
  id: TabID;
  name: string;
}
@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent implements OnInit {

  account: ReaderAccount;

  get isSandbox(): boolean {
    return this.account && this.account.email.endsWith(testAccountSuffix);
  }

  navTabs: Tab[] = [
    {
      id: 'order',
      name: 'Subscription Orders'
    },
    {
      id: 'snap',
      name: 'Membership Snapshots'
    },
    {
      id: 'iap',
      name: 'IAP Subscriptions'
    }
  ];

  currentTabId: TabID;

  constructor(
    private route: ActivatedRoute,
    private readerService: ReaderService,
    private toast: ToastService,
    private progress: ProgressService,
  ) {
    this.progress.start();
   }

  get isFtc(): boolean {
    return (this.account && this.account.ftcId) ? true : false;
  }

  get hasWechat(): boolean {
    return !!(this.account && this.account.unionId);
  }

  get hasMember(): boolean {
    return !!(this.account && isMember(this.account.membership));
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
          this.progress.stop();

          this.account = data;
        },
        error: (err: HttpErrorResponse) => {
          this.progress.stop();

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

  onTab(id: TabID) {
    this.currentTabId = id;
  }
}
