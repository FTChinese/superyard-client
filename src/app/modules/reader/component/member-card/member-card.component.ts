import { Component, OnInit, Input } from '@angular/core';
import { Membership, isMember } from 'src/app/data/schema/membership';
import { MenuItem, SelectedItem } from 'src/app/shared/widget/menu';
import { ModalService } from 'src/app/shared/service/modal.service';
import { FormService } from 'src/app/shared/service/form.service';
import { MemberForm } from 'src/app/data/schema/form-data';
import { ReaderService } from '../../service/reader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/shared/service/toast.service';
import { RequestError } from 'src/app/data/schema/request-result';
import { PropertyItem } from 'src/app/shared/widget/property-list';
import { Plan } from 'src/app/data/schema/product';
import { ProgressService } from 'src/app/shared/service/progress.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
  providers: [FormService]
})
export class MemberCardComponent implements OnInit {

  private idFtc = 'f';
  private idApple = 'a';
  private idStripe = 's';

  // The membership's compoundId should always exists if if the hasMember is false.
  @Input() member: Membership;

  plans: Plan[];

  get memberProperties(): PropertyItem[] {
    return [
      {
        label: 'Expiration',
        value: this.member.expireDate,
      },
      {
        label: 'Paid via',
        value: this.member.payMethod,
      },
      {
        label: 'Auto Renewal',
        value: this.member.autoRenewal ? 'Yes' : 'No',
      }
    ];
  }

  get isWxOrAliPay(): boolean {
    return this.hasMember && (this.member.payMethod === 'alipay' || this.member.payMethod === 'wechat');
  }

  get hasMember(): boolean {
    return this.member && isMember(this.member);
  }

  get modalTitle(): string {
    return this.hasMember
      ? 'Modify membership'
      : 'Create membership';
  }

  get ftcFormOn(): boolean {
    return this.modal.on && this.modal.id === this.idFtc;
  }

  constructor(
    readonly modal: ModalService,
    private toast: ToastService,
    private progress: ProgressService,
    private formService: FormService,
    private readerService: ReaderService
  ) { }

  ngOnInit(): void {
    this.formService.formSubmitted$
      .subscribe(data => {
        const formData: MemberForm = JSON.parse(data);

        console.log(formData);

        if (this.hasMember) {
          // Update membership
          this.update(formData);
        } else {
          // create membership.
          this.create(formData);
        }
      });
  }

  showFtcForm() {
    this.progress.start();
    this.toast.info('Loading active pricing plans...');
    this.readerService.listPaywallPlans().subscribe({
      next: plans => {
        this.progress.stop();
        this.plans = plans;
        console.log(plans);

        this.modal.open(this.idFtc);
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();
        const reqErr = new RequestError(err);
        console.log(reqErr);

        this.toast.info('Cannot load active plans now. You can copy plan id from the paywall section');

        this.modal.open(this.idFtc);
      }
    });
  }

  private create(form: MemberForm) {
    const m: Membership = Object.assign({}, this.member, form);

    this.readerService.createMembership(m)
      .subscribe({
        next: ok => {
          if (ok) {
            this.modal.close();
            this.toast.info('Created successfully. Refreshing data...');
            this.refresh();
          } else {
            this.toast.error('Unknow error occurred');
            this.formService.enable(true);
          }
        },
        error: (err: HttpErrorResponse) => {
          const errRes = new RequestError(err);
          this.formService.sendError(errRes);
          this.toast.error(errRes.message);
        }
      });
  }

  private update(form: MemberForm) {
    this.readerService.updateMembership(this.member.compoundId, form)
      .subscribe({
        next: ok => {
          if (ok) {
            this.modal.close();
            this.toast.info('Updated successfully. Refreshing data...');

            this.refresh();
          } else {
            this.toast.error('Unknown error occurred!');
            this.formService.enable(true);
          }
        },
        error: (err: HttpErrorResponse) => {
          const errRes = new RequestError(err);
          this.formService.sendError(errRes);
          this.toast.error(errRes.message);
        }
      });
  }

  private refresh() {

    this.readerService.refreshMembership(this.member.compoundId)
      .subscribe({
        next: m => {
          this.member = m;
          this.toast.info('Data refreshed');
        },
        error: (err: HttpErrorResponse) => {
          const errRes = new RequestError(err);
          this.toast.error(errRes.message);
        }
      });
  }
}
