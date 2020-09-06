import { Component, OnInit, Input } from '@angular/core';
import { Membership, isMember } from 'src/app/data/schema/membership';
import { MenuItem, SelectedItem } from 'src/app/shared/widget/menu';
import { ModalService } from 'src/app/shared/service/modal.service';
import { FormService } from 'src/app/shared/service/form.service';
import { MemberForm } from 'src/app/data/schema/form-data';
import { ReaderService } from 'src/app/data/service/reader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/shared/service/toast.service';
import { RequestError } from 'src/app/data/schema/request-result';
import { PropertyItem } from 'src/app/shared/widget/property-list';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
  providers: [FormService]
})
export class MemberCardComponent implements OnInit {

  // The membership's compoundId should always exists if if the hasMember is false.
  @Input() member: Membership;
  // A fallback message visible when membership data is not available.
  @Input() status = 'It seems this account does not have a membership yet.';
  @Input() showMenu = true;

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
        label: 'Auto Renwal',
        value: this.member.autoRenewal ? 'Yes' : 'No',
      }
    ]
  }

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

  constructor(
    readonly modal: ModalService,
    private toast: ToastService,
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

  // Show the form to create/update membership.
  // Which item is selected does no actually matter herer.
  onMenuSelected(item: SelectedItem) {
    this.modal.open();
  }
}
