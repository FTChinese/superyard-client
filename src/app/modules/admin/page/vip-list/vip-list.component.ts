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
import { DynamicControl, InputControl } from 'src/app/shared/widget/control';
import { buildPrevNext, getPaging, PrevNextLink } from 'src/app/shared/widget/paging';
import { AdminService } from '../../service/admin.service';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { GrantForm } from '../../schema/form-data';
import { PagedData } from 'src/app/data/schema/paged-data';

@Component({
  selector: 'app-vip-list',
  templateUrl: './vip-list.component.html',
  styleUrls: ['./vip-list.component.scss'],
  providers: [FormService]
})
export class VipListComponent implements OnInit {

  private idRevoke = 'r';
  private idGrant = 'g';

  vips: PagedData<FtcAccount>;
  prevNext: PrevNextLink;

  revokeIndex: number;
  warning: string;

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
    readonly progress: ProgressService,
    private adminService: AdminService,
    private modal: ModalService,
    private formService: FormService
  ) {
    this.progress.start();
  }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      switchMap(params => {
        const paging = getPaging(params, 20);
        return this.adminService.listVip(paging);
      })
    )
    .subscribe({
      next: vips => {
        this.progress.stop();
        this.vips = vips;
        this.prevNext = buildPrevNext(vips);
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();
        const reqErr = new RequestError(err);

        this.toast.error(reqErr.message);
      }
    });

    this.formService.formSubmitted$.subscribe(data => {
      const formData: GrantForm = JSON.parse(data);
      const email = formData.email;

      if (this.vips.data.findIndex(v => v.email === email) > -1) {
        this.formService.enable(true);
        this.warning = `${email} is already granted vip`;
        return;
      }

      this.onGrant(email);
    });
  }

  onNavigate() {
    this.progress.start();
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
        this.vips.data.unshift(a);
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
    const a = this.vips.data[this.revokeIndex];

    console.log('Revoking VIP from %o', a);

    if (!a) {
      this.toast.error('Selected user not found!');

      return;
    }

    this.progress.start();

    this.adminService.revokeVip(a.ftcId).subscribe({
      next: () => {
        this.progress.stop();
        this.vips.data.splice(this.revokeIndex, 1);
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
