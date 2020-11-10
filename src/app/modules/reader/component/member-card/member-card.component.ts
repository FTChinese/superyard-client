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
import { switchMap } from 'rxjs/operators';
import { PaymentMethod } from 'src/app/data/schema/enum';

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
  private idDelMember = 'd_m';
  private aliWxPay: PaymentMethod[] = ['alipay', 'wechat'];

  // Determine read-only mode.
  // This component is also used as part of the order component and we don't want
  // membership data modified directly in such case.
  // Use [modifiable]=false to set values since its initial value is true.
  @Input() modifiable = true;
  @Input() account: ReaderAccount;

  get member(): Membership {
    return this.account.membership;
  }

  get hasMember(): boolean {
    return this.account && isMember(this.account.membership);
  }

  get isWxOrAliPay(): boolean {
    return this.hasMember && (this.aliWxPay.includes(this.account.membership.payMethod) || this.account.membership.payMethod == null);
  }

  get isIAP(): boolean {
    return this.hasMember && this.account.membership.payMethod === 'apple';
  }

  get isStripe(): boolean {
    return this.hasMember && this.account.membership.payMethod === 'stripe';
  }

  get ftcFormTitle(): string {
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

  get iapFormOn(): boolean {
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
    console.log(this.modifiable);
  }

  showFtcForm() {
    this.modal.open(this.idFtc);
  }

  showIAPForm() {
    this.modal.open(this.idApple);
  }

  showStripeForm() {
    this.modal.open(this.idStripe);
  }

  confirmDelete() {
    this.modal.open(this.idDelMember);
  }

  /**
   * @description handle membership upated event from child component.
   */
  onMemberUpdated(m: Membership) {
    this.account.membership = m;
    this.modal.close();
  }

  /**
   * @description Delete FTC member.
   */
  onDeleteMember() {
    this.progress.start();

    this.readerService.deleteFtcMember(this.member.compoundId)
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

  onRefreshIAP() {
    this.progress.start();
    this.readerService
      .refreshIAP(this.account.membership.appleSubsId)
      .pipe(switchMap(subs => {
        return this.readerService.loadIAPMember(subs.originalTransactionId);
      }))
      .subscribe({
        next: m => {
          this.progress.stop();
          this.account.membership = m;
          console.log('IAP refreshed membership %o', m)
        },
        error: (err: HttpErrorResponse) => {
          this.progress.stop();
          const reqErr = new RequestError(err);
          this.toast.error(reqErr.message);
        }
      });
  }

  onUnlinkIAP() {
    this.progress.start();

    this.readerService.unlinkIAP(this.account.ftcId, {
      originalTxId: this.account.membership.appleSubsId
    })
    .subscribe({
      next: ok => {
        this.progress.stop();
        if (ok) {
          this.account.membership = zeroMember();
        } else {
          this.toast.error('Unlinking failed');
        }
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();
        const reqErr = new RequestError(err);
        this.toast.error(reqErr.message);
      }
    });
  }
}
