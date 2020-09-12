import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FtcAccount } from 'src/app/data/schema/reader';
import { RequestError } from 'src/app/data/schema/request-result';
import { ModalService } from 'src/app/shared/service/modal.service';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { DynamicControl, InputGroupControl } from 'src/app/shared/widget/control';
import { getPaging, Paged, Paging } from 'src/app/shared/widget/paging';
import { AdminService } from '../../service/admin.service';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { GrantForm, vipEmailSuffix } from '../../schema/form-data';

@Component({
  selector: 'app-vip-list',
  templateUrl: './vip-list.component.html',
  styleUrls: ['./vip-list.component.scss'],
  providers: [FormService]
})
export class VipListComponent implements OnInit {

  private idRevoke = 'r';
  private idGrant = 'g';

  vips: FtcAccount[];
  private paging: Paging;
  paged: Paged;

  revokeIndex: number;
  warning: string;

  controls: DynamicControl[] = [
    new InputGroupControl({
      value: '',
      key: 'email',
      validators: [
        Validators.required,
      ],
      label: 'Email *',
      type: 'text',
      append: vipEmailSuffix,
      desc: 'Only emails signed up with ftchinese.com are accepted'
    }),
  ];

  button: Button = Button
    .primary()
    .setName('Grant');


  get revokeOn(): boolean {
    return this.modal.on && this.modal.id === this.idRevoke;
  }

  get grantOn(): boolean {
    return this.modal.on && this.modal.id === this.idGrant;
  }

  constructor(
    private route: ActivatedRoute,
    private toast: ToastService,
    private progress: ProgressService,
    private adminService: AdminService,
    private modal: ModalService,
    private formService: FormService
  ) {
    progress.start();
  }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      switchMap(params => {
        const paging = getPaging(params, 20);
        this.paging = paging;

        return this.adminService.listVip(paging);
      })
    )
    .subscribe({
      next: vips => {
        this.progress.stop();
        this.vips = vips;
        this.paged = {
          ...this.paging,
          count: vips.length,
        };
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();
        const reqErr = new RequestError(err);

        this.toast.error(reqErr.message);
      }
    });

    // Forbid entering email domain part.
    this.formService.formCreated$.subscribe(form => {
      const ctrl = form.get('email');

      ctrl.valueChanges.subscribe((v: string) => {
        if (v.includes('@')) {
          ctrl.setValue(v.split('@')[0]);
        }
      });
    });

    this.formService.formSubmitted$.subscribe(data => {
      const formData: GrantForm = JSON.parse(data);
      const email = formData.email + vipEmailSuffix;

      if (this.vips.findIndex(v => v.email === email) > -1) {
        this.formService.enable(true);
        this.warning = `${email} is already granted vip`;
        return;
      }

      this.onGrant(email);
    });
  }

  showRevoke(i: number) {
    this.revokeIndex = i;
    this.modal.open(this.idRevoke);
  }

  showGrant() {
    this.warning = undefined;
    this.modal.open(this.idGrant);
  }

  onGrant(email: string) {
    this.warning = undefined;

    this.adminService.findFtcAccount(email)
    .subscribe({
      next: account => {
        this.grant(account.ftcId);
      },
      error: (err: HttpErrorResponse) => {
        this.formService.enable(true);

        const reqErr = new RequestError(err);
        if (reqErr.notFound) {
          this.toast.error('The email you entered is not found');
          return;
        }

        this.toast.error(reqErr.message);
      }
    });
  }

  private grant(ftcId: string) {
    this.adminService.grantVip(ftcId).subscribe({
      next: a => {
        this.vips.unshift(a);
        this.modal.close();
        this.formService.enable(true);
      },
      error: (err: HttpErrorResponse) => {
        this.formService.enable(true);
        const reqErr = new RequestError(err);
        if (reqErr.notFound) {
          this.warning = 'The email you entered is not found.';
          return;
        }
        this.toast.error(reqErr.message);
      }
    });
  }

  onRevoke() {
    const a = this.vips[this.revokeIndex];
    if (!a) {
      this.toast.error('Selected user not found!');

      return;
    }

    this.progress.start();

    this.adminService.revokeVip(a.ftcId).subscribe({
      next: () => {
        this.progress.stop();
        this.vips.splice(this.revokeIndex, 1);
        this.revokeIndex = undefined;
        this.modal.close();
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();
        const reqErr = new RequestError(err);
        this.toast.error(reqErr.message);
      }
    });
  }
}
