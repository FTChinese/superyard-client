import { Component, OnInit, Input } from '@angular/core';
import { Membership, isMember } from 'src/app/data/schema/membership';
import { ModalService } from 'src/app/shared/service/modal.service';
import { PropertyItem } from 'src/app/shared/widget/property-list';
import { Plan } from 'src/app/data/schema/product';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent implements OnInit {

  private idFtc = 'f';

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
  ) { }

  ngOnInit(): void {
  }

  showFtcForm() {
    this.modal.open(this.idFtc);
  }
}
