import { Component, OnInit, Input } from '@angular/core';
import { AccessToken } from 'src/app/data/schema/oauth';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss']
})
export class TokenListComponent implements OnInit {

  @Input() tokens: AccessToken[];

  constructor() { }

  ngOnInit(): void { }

  onDelete(token: AccessToken) {
    const index = this.tokens.findIndex(k => k.id === token.id);

    this.tokens.splice(index, 1);
  }
}
