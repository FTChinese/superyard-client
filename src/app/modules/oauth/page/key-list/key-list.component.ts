import { Component, OnInit } from '@angular/core';
import { AccessToken } from 'src/app/data/schema/oauth';
import { FormBuilder } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { OAuthService } from 'src/app/data/service/oauth.service';

@Component({
  selector: 'app-key-list',
  templateUrl: './key-list.component.html',
  styleUrls: ['./key-list.component.scss']
})
export class KeyListComponent implements OnInit {

  keys: AccessToken[];

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
