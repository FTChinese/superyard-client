import { Component, OnInit, Input } from '@angular/core';
import { Membership, isMember } from 'src/app/data/schema/membership';
import { ModalService } from 'src/app/shared/service/modal.service';
import { PropertyItem } from 'src/app/shared/widget/property-list';
import { ReaderAccount, zeroMember } from 'src/app/data/schema/reader';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ReaderService } from '../../service/reader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';
import { ToastService } from 'src/app/shared/service/toast.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent implements OnInit {

  // ID for dialog to show ftc subs form
  private idFtc = 'f_ftc';
  // ID for dialog to show the apple subs form
  private idApple = 'f_iap';
  // ID for dialog to show the stripe subs form
  private idStripe = 'f_stripe';
  // ID to show confirmation of deleting membership.
  private idDelMember = 'c_d_m';

  // Determine read-only mode.
  // This component is also used as part of the order component and we don't want
  // membership data modified directly in such case.
  @Input() modifiable = true;
  @Input() account: ReaderAccount;

  get member(): Membership {
    return this.account.membership;
  }

  get hasMember(): boolean {
    return this.account && isMember(this.account.membership);
  }

  get isWxOrAliPay(): boolean {
    return this.hasMember && (this.account.membership.payMethod === 'alipay' || this.account.membership.payMethod === 'wechat');
  }

  get modalTitle(): string {
    return this.hasMember
      ? 'Modify membership'
      : 'Create membership';
  }

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

  get ftcFormOn(): boolean {
    return this.modal.on && this.modal.id === this.idFtc;
  }

  get appleFormOn(): boolean {
    return this.modal.on && this.modal.id === this.idApple;
  }

  get stripeFormOn(): boolean {
    return this.modal.on && this.modal.id === this.idStripe;
  }

  get deleteMemberOn(): boolean {
    return this.modal.on && this.modal.id === this.idDelMember;
  }

  constructor(
    private modal: ModalService,
    readonly progress: ProgressService,
    private readerService: ReaderService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
  }

  showFtcForm() {
    this.modal.open(this.idFtc);
  }

  showAppleForm() {
    this.modal.open(this.idApple);
  }

  showStripeForm() {
    this.modal.open(this.idStripe);
  }

  confirmDelete() {
    this.modal.open(this.idDelMember);
  }

  onMemberUpdated(m: Membership) {
    this.account.membership = m;
    this.modal.close();
  }

  onDeleteMember() {
    this.progress.start();

    this.readerService.deleteMember(this.member.compoundId)
      .subscribe({
        next: ok => {
          this.progress.stop();
          this.modal.close();

          this.toast.info('Membership dropped!');
          this.account.membership = zeroMember();
        },
        error: (err: HttpErrorResponse) => {
          this.progress.stop();

          const reqErr = new RequestError(err);
          this.toast.error(reqErr.message);
        }
      });
  }
}
