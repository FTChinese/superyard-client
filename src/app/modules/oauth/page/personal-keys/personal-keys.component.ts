import { Component, OnInit } from '@angular/core';
import { AccessToken } from 'src/app/data/schema/oauth';
import { OAuthService } from 'src/app/data/service/oauth.service';
import { ModalService } from 'src/app/shared/service/modal.service';

@Component({
  selector: 'app-personal-keys',
  templateUrl: './personal-keys.component.html',
  styleUrls: ['./personal-keys.component.scss']
})
export class PersonalKeysComponent implements OnInit {

  keys: AccessToken[];

  get keyFormOpend(): boolean {
    return this.modal.on && this.modal.id === 'key';
  }

  constructor(
    private oauthServcie: OAuthService,
    readonly modal: ModalService
  ) { }

  // TODO: use async pipe.
  ngOnInit(): void {
    this.oauthServcie.listPersonalKeys().subscribe({
      next: keys => {
        this.keys = keys;
      },
      error: err => console.log(err),
    });
  }

  showKeyForm() {
    this.modal.open('key');
  }

  onKeyCreated(k: AccessToken) {
    this.modal.close();
    this.keys.unshift(k);
  }
}
