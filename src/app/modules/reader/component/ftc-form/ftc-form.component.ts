import { Component, OnInit, Input } from '@angular/core';
import { Membership, isMember } from 'src/app/data/schema/membership';
import { DynamicControl, DropdownControl, InputControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
import { tierOpts, paymentMethodOpts, cycleOpts } from 'src/app/data/schema/enum';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { Plan } from 'src/app/data/schema/product';

@Component({
  selector: 'app-ftc-form',
  templateUrl: './ftc-form.component.html',
  styleUrls: ['./ftc-form.component.scss']
})
export class FtcFormComponent implements OnInit {

  @Input() plans: Plan[] = [];
  @Input() member: Membership;

  controls: DynamicControl[] = [
    new DropdownControl({
      value: '',
      key: 'tier',
      validators: [Validators.required],
      label: 'Tier',
      options: tierOpts
    }),
    new DropdownControl({
      value: '',
      key: 'cycle',
      validators: [Validators.required],
      label: 'Billing Cycle',
      options: cycleOpts
    }),
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
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.formService.formCreated$
      .subscribe(form => {
        if (!this.member || !isMember(this.member)) {
          return;
        }
        form.patchValue({
          tier: this.member.tier,
          cycle: this.member.cycle,
          expireDate: this.member.expireDate,
          payMethod: this.member.payMethod,
        });
      });
  }

}
