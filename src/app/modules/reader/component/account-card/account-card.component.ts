import { Component, OnInit, Input } from '@angular/core';
import { JoinedAccount } from 'src/app/data/schema/reader';
import { PropertyItem } from 'src/app/shared/widget/property-list';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {

  @Input() account: JoinedAccount;

  get hasWechat(): boolean {
    return !!(this.account && this.account.unionId);
  }

  get metaProperties(): PropertyItem[] {
    return [
      {
        label: 'Created UTC',
        value: this.account.createdUtc
      },
      {
        label: 'Updated UTC',
        value: this.account.updatedUtc
      }
    ].concat(
      this.account.createdBy
      ? [{
        label: 'Created by',
        value: this.account.createdBy
      }]
      : []);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
