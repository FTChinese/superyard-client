import { Component, OnInit } from '@angular/core';
import { IAccessToken } from 'src/app/data/schema/oauth';
import { OAuthService } from '../../../data/service/oauth.service';
import { FormBuilder } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-key-list',
  templateUrl: './key-list.component.html',
  styleUrls: ['./key-list.component.scss']
})
export class KeyListComponent implements OnInit {

  keys: IAccessToken[];

  keyForm = this.formBuilder.group({
    description: [''],
    clientId: [null],
    createdBy: [''],
  });

  constructor(
    private oauthServcie: OAuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.oauthServcie.listPersonalKeys().subscribe({
      next: keys => {
        this.keys = keys;
      },
      error: err => console.log(err),
    });
  }

  onSubmit() {
    console.log(this.keyForm.value);
    this.oauthServcie.createToken(this.keyForm.value)
      .pipe(
        switchMap(ok => {
          return this.oauthServcie.listPersonalKeys();
        })
      )
      .subscribe({
        next: keys => {
          console.log(keys);
          this.keys = keys;
        },
        error: err => console.log(err),
      });
  }
}
