import { Component, OnInit } from '@angular/core';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { SandboxService } from '../../service/sandbox.service';
import { FtcAccount } from 'src/app/data/schema/reader';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { getPaging } from 'src/app/shared/widget/paging';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';
import { ModalService } from 'src/app/shared/service/modal.service';
import { DynamicControl, InputControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { SandboxUserForm } from '../../schema/sandbox-form';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
  providers: [FormService]
})
export class SandboxComponent implements OnInit {

  users: FtcAccount[];

  controls: DynamicControl[] = [
    new InputControl({
      value: '',
      key: 'email',
      validators: [
        Validators.required,
        Validators.email,
      ],
      label: 'Email *',
      type: 'text',
    }),
    new InputControl({
      value: '',
      key: 'password',
      validators: [
        Validators.required
      ],
      label: 'Password',
      type: 'text',
    })
  ];

  button: Button = Button
    .primary()
    .setName('Login');

  constructor(
    private sandboxService: SandboxService,
    private formService: FormService,
    readonly modal: ModalService,
    private progress: ProgressService,
    private toast: ToastService,
    private route: ActivatedRoute,
  ) {
    this.progress.start();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        return this.sandboxService.listUsers(getPaging(params));
      })
    )
    .subscribe({
      next: users => {
        console.log('Sandbox users: %o', users);

        this.progress.stop();
        this.users = users;
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();

        const reqErr = new RequestError(err);

        this.toast.error(reqErr.message);
      }
    });

    this.formService.formSubmitted$.subscribe(data => {
      const formData: SandboxUserForm = JSON.parse(data);

      this.createAccount(formData);
    });
  }

  modalOn() {
    this.modal.open();
  }

  createAccount(form: SandboxUserForm) {
    this.sandboxService.createUser(form)
      .subscribe({
        next: account => {
          this.users.unshift(account);
          this.toast.info('Sandbox account created!');
          this.modal.close();
        },
        error: (err: HttpErrorResponse) => {
          const reqErr = new RequestError(err);
          this.formService.sendError(reqErr);
        }
      });
  }
}
