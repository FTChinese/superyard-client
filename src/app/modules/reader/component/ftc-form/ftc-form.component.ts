import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Membership } from 'src/app/data/schema/membership';
import { DynamicControl, DropdownControl, InputControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
import { tierOpts, paymentMethodOpts, Tier, Cycle } from 'src/app/data/schema/enum';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { FtcMemberForm, buildCycleDropdown } from '../../schema/sandbox-form';
import { ReaderService } from '../../service/reader.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';
import { ReaderAccount } from 'src/app/data/schema/reader';

@Component({
  selector: 'app-ftc-form',
  templateUrl: './ftc-form.component.html',
  styleUrls: ['./ftc-form.component.scss'],
  providers: [FormService],
})
export class FtcFormComponent implements OnInit {

  @Input() account: ReaderAccount;
  @Output() succeeded = new EventEmitter<Membership>();

  controls: DynamicControl[] = [
    new DropdownControl({
      value: null,
      key: 'tier',
      validators: [Validators.required],
      label: 'Tier',
      options: tierOpts
    }),
    buildCycleDropdown(),
    new InputControl({
      value: null,
      key: 'expireDate',
      validators: [Validators.required],
      label: 'Expiration Date',
      type: 'date'
    }),
    new DropdownControl({
      value: null,
      key: 'payMethod',
      label: 'Payment Method',
      options: paymentMethodOpts
    })
  ];

  button: Button = Button.primary().setName('Save');

  constructor(
    private formService: FormService,
    private readerService: ReaderService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {

    this.formService.formCreated$
      .subscribe(form => {

        // Ensure that when premium is selected, month is disabled and deselected.
        form.get('tier').valueChanges.subscribe((tier: Tier) => {

          this.controls[1] = buildCycleDropdown(tier);

          const cycle: Cycle = form.get('cycle').value;

          if (tier === 'premium' && cycle === 'month') {
            form.patchValue({
              cycle: 'year'
            });
          }
        });

        // Path form value. If membership have value,
        // this action will trigger the previous valueChanges and ensure premium and month cannot be selected at the same time.
        // If you set this before calling valueChanges, the callback won't happen.
        form.patchValue({
          tier: this.account.membership.tier,
          cycle: this.account.membership.cycle,
          expireDate: this.account.membership.expireDate,
          payMethod: this.account.membership.payMethod
        });
      });

    this.formService.formSubmitted$.subscribe(data => {
      const formData: FtcMemberForm = JSON.parse(data);
      formData.ftcId = this.account.ftcId;
      formData.unionId = this.account.unionId;

      console.log('Updating membership: %o', formData);

      this.upsert(formData);
    });
  }

  private upsert(form: FtcMemberForm) {
    this.readerService.upsertFtcMember(form)
      .subscribe({
        next: m => {
          this.toast.info('Modification succeeded');
          this.formService.enable(true);
          this.succeeded.emit(m);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);

          const reqErr = new RequestError(err);
          this.formService.sendError(reqErr);
        }
      });
  }
}
