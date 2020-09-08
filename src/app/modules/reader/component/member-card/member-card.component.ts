import { Component, OnInit, Input } from '@angular/core';
import { Membership, isMember } from 'src/app/data/schema/membership';
import { ModalService } from 'src/app/shared/service/modal.service';
import { PropertyItem } from 'src/app/shared/widget/property-list';
import { ReaderAccount } from 'src/app/data/schema/reader';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent implements OnInit {

  private idFtc = 'f';
  private idApple = 'a';
  private idStripe = 's';

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

  constructor(
    readonly modal: ModalService,
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

  onMemberUpdated(m: Membership) {
    this.account.membership = m;
    this.modal.close();
  }
}
