import { Component, OnInit, Input } from '@angular/core';
import { ReaderAccount } from 'src/app/data/schema/reader';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {

  @Input() account: ReaderAccount;

  get hasWechat(): boolean {
    return !!(this.account && this.account.unionId);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
