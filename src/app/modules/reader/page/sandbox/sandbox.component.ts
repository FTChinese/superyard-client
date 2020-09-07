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
import { DynamicControl, InputControl, InputGroupControl } from 'src/app/shared/widget/control';
import { Validators, FormGroup } from '@angular/forms';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { SandboxUserForm, pwControl, sandboxSuffix } from '../../schema/sandbox-form';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
  providers: [FormService]
})
export class SandboxComponent implements OnInit {

  users: FtcAccount[];

  controls: DynamicControl[] = [
    new InputGroupControl({
      value: '',
      key: 'email',
      validators: [
        Validators.required,
      ],
      label: 'Email *',
      type: 'text',
      append: sandboxSuffix,
    }),
    pwControl,
  ];

  button: Button = Button
    .primary()
    .setName('Create');

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

    this.formService.formCreated$.subscribe(form => {
      const ctrl = form.get('email');

      ctrl.valueChanges.subscribe((v: string) => {
        if (v.includes('@')) {
          ctrl.setValue(v.split('@')[0]);
        }
      });
    });

    this.formService.formSubmitted$.subscribe(data => {
      const formData: SandboxUserForm = JSON.parse(data);

      formData.email = formData.email + sandboxSuffix;
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
          this.formService.enable(true);
        },
        error: (err: HttpErrorResponse) => {
          const reqErr = new RequestError(err);
          this.formService.sendError(reqErr);
        }
      });
  }
}
