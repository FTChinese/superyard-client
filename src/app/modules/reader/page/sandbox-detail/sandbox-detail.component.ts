import { Component, OnInit } from '@angular/core';
import { ReaderAccount } from 'src/app/data/schema/reader';
import { SandboxService } from '../../service/sandbox.service';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';
import { ModalService } from 'src/app/shared/service/modal.service';
import { DynamicControl, InputControl } from 'src/app/shared/widget/control';
import { pwControl, SandboxPasswordForm } from '../../schema/sandbox-form';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-sandbox-detail',
  templateUrl: './sandbox-detail.component.html',
  styleUrls: ['./sandbox-detail.component.scss'],
  providers: [FormService]
})
export class SandboxDetailComponent implements OnInit {

  private idDelete = 'd';
  private idPw = 'p';

  pwControls: DynamicControl[] = [
    new InputControl({
      value: '',
      key: 'password',
      validators: [
        Validators.required
      ],
      label: 'New Password *',
      type: 'text',
    })
  ];

  button: Button = Button
    .primary()
    .setName('Change');

  get deleteOn(): boolean {
    return this.modal.on && this.modal.id === this.idDelete;
  }

  get pwOn(): boolean {
    return this.modal.on && this.modal.id === this.idPw;
  }

  account: ReaderAccount;

  constructor(
    private sandboxService: SandboxService,
    private formService: FormService,
    readonly progress: ProgressService,
    private modal: ModalService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');

        return this.sandboxService.loadAccount(id);
      })
    )
    .subscribe({
      next: account => {
        console.log('Sandbox users: %o', account);

        this.progress.stop();
        this.account = account;
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();

        const reqErr = new RequestError(err);

        this.toast.error(reqErr.message);
      }
    });

    this.formService.formSubmitted$.subscribe(data => {
      const formData: SandboxPasswordForm = JSON.parse(data);

      this.changePassword(formData);
    });
  }

  showDelete() {
    this.modal.open(this.idDelete);
  }

  showPwBox() {
    this.modal.open(this.idPw);
  }

  deleteAccount() {
    this.progress.start();

    this.sandboxService.deleteAccount(this.account.ftcId).subscribe({
      next: ok => {
        this.progress.stop();
        this.modal.close();
        if (ok) {
          this.toast.info('Sandbox user deleted');
          this.router.navigate(['../'], {
            relativeTo: this.route
          });
        } else {
          this.toast.error('Delete sandbox user failed!');
        }
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();

        const reqErr = new RequestError(err);
        this.toast.error(reqErr.message);
      }
    });
  }

  private changePassword(form: SandboxPasswordForm) {
    this.sandboxService.changePassword(this.account.ftcId, form)
      .subscribe({
        next: ok => {
          if (ok) {
            this.toast.info('Password changed!');
            this.account.password = form.password;
            this.modal.close();
          } else {
            this.toast.error('Change password failed');
          }
        },
        error: (err: HttpErrorResponse) => {
          const reqErr = new RequestError(err);

          this.formService.sendError(reqErr);
        }
      });
  }
}
