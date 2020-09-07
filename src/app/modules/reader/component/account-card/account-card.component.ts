import { Component, OnInit, Input } from '@angular/core';
import { JoinedAccount } from 'src/app/data/schema/reader';

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

  constructor() { }

  ngOnInit(): void {
  }

}
