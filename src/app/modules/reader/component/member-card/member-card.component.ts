import { Component, OnInit, Input } from '@angular/core';
import { Membership, isMember } from 'src/app/data/schema/reader';
import { MenuItem } from 'src/app/shared/widget/menu';
import { ModalService } from 'src/app/shared/service/modal.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {

  @Input() member: Membership;
  // A fallback message visible when membership data is not available.
  @Input() status = 'It seems this account does not have a membership yet.';

  get menuItems(): MenuItem[] {
    if (!this.member) {
      return [
        {
          id: 'create',
          name: 'Create'
        }
      ];
    }

    return [
      {
        id: 'modify',
        name: 'Modify'
      }
    ];
  }

  get hasMember(): boolean {
    return this.member && isMember(this.member);
  }

  get modalTitle(): string {
    return this.hasMember
      ? 'Modify membership'
      : 'Create membership';
  }

  get isStripe(): boolean {
    return this.hasMember && this.member.payMethod === 'stripe';
  }

  get isIAP(): boolean {
    return this.hasMember && this.member.payMethod === 'apple';
  }

  get isB2B(): boolean {
    return this.hasMember && this.member.payMethod === 'b2b';
  }

  constructor(
    readonly modal: ModalService
  ) { }

  ngOnInit(): void {
  }

  onMenuSelected(item: MenuItem) {
    console.log('Menu item selected %o', item);
    switch (item.id) {
      case 'create':
        console.log('show form to create membership');
        this.modal.open();
        break;

      case 'modify':
        console.log('show form to modify membership');
        this.modal.open();
        break;

      default:
        throw new Error('Undefined menu item');
    }
  }
}
