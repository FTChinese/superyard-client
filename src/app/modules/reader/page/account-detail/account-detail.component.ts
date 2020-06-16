import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IReaderAccount, IWxProfile, IFtcProfile } from 'src/app/data/schema/reader';
import { zip } from 'rxjs';
import { AccountKind } from 'src/app/data/schema/enums';
import { TableRow } from '../../account-item';
import { ReaderService } from 'src/app/data/service/reader.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  currentReader: IReaderAccount;
  accountRows: TableRow[];
  showCreateForm = false;

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
          if (data.membership.id) {

          }

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
        },
        error: err => {
          console.log(err);
        }
      });
  }

  // Create/Destroy for to create subscritpion.
  onToggleForm(on: boolean) {
    console.log('Toggle form event: ' + on);
    this.showCreateForm = on;
  }

  loadFtcProfile() {
    this.readerService.loadFtcProfile(this.currentReader.ftcId)
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

    this.readerService.loadWxProfile(this.currentReader.unionId)
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
