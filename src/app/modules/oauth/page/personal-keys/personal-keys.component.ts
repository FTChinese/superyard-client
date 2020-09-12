import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AccessToken } from 'src/app/data/schema/oauth';
import { RequestError } from 'src/app/data/schema/request-result';
import { OAuthService } from 'src/app/data/service/oauth.service';
import { ModalService } from 'src/app/shared/service/modal.service';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { getPaging, Paging } from 'src/app/shared/widget/paging';

@Component({
  selector: 'app-personal-keys',
  templateUrl: './personal-keys.component.html',
  styleUrls: ['./personal-keys.component.scss']
})
export class PersonalKeysComponent implements OnInit {

  keys: AccessToken[];
  paging: Paging;

  get keyFormOpend(): boolean {
    return this.modal.on && this.modal.id === 'key';
  }

  constructor(
    private oauthService: OAuthService,
    readonly modal: ModalService,
    private progress: ProgressService,
    private toast: ToastService,
    private route: ActivatedRoute,
  ) {
    progress.start();
   }

  // TODO: use async pipe.
  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      switchMap(params => {
        const paging = getPaging(params);
        this.paging = paging;

        return this.oauthService.listPersonalKeys(paging);
      })
    )
    .subscribe({
      next: keys => {
        this.progress.stop();

        this.keys = keys;
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();
        const reqErr = new RequestError(err);
        this.toast.error(reqErr.message);
      },
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
