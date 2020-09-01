import { Component, OnInit, Input } from '@angular/core';
import { Membership, isMember } from 'src/app/data/schema/membership';
import { Validators, FormGroup} from '@angular/forms';
import { Tier, cycleOpts, tierOpts, paymentMethodOpts } from 'src/app/data/schema/enum';
import { DynamicControl, DropdownControl, InputControl } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {

  @Input() member: Membership;

  dynamicControls: DynamicControl[] = [
    new DropdownControl({
      value: null,
      key: 'tier',
      validators: [Validators.required],
      label: 'Tier',
      options: tierOpts
    }),
    new DropdownControl({
      value: null,
      key: 'cycle',
      validators: [Validators.required],
      label: 'Cycle',
      options: cycleOpts,
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

  form: FormGroup;

  constructor(
    private formService: FormService
  ) { }

  ngOnInit(): void {

    this.formService.formCreated$
      .subscribe(form => {
        form.get('tier').valueChanges
          .subscribe((tier: Tier) => {
            if (tier === 'premium') {
              form.patchValue({
                cycle: 'year'
              });

              this.dynamicControls[1] = this.buildCycleControl(tier);
            }
          });

        this.form = form;
        // Path form data once it is created.
        this.patchForm();
      });
  }

  // buildCycleControl disables the month option
  // depending on whether tier is premium.
  private buildCycleControl(tierSelected?: Tier): DropdownControl {

    const opts = cycleOpts.map(opt => {
      if (opt.value !== 'month') {
        return opt;
      }

      return {
        disabled: tierSelected === 'premium',
        value: opt.value,
        name: opt.name
      };
    });

    return new DropdownControl({
      value: null,
      key: 'cycle',
      validators: [Validators.required],
      label: 'Cycle',
      options: opts,
    });
  }

  // Patch form if membership data presents after
  // form is created
  private patchForm() {
    if (!this.member || !isMember(this.member)) {
      return;
    }

    this.form.patchValue({
      tier: this.member.tier,
      cycle: this.member.cycle,
      expireDate: this.member.expireDate,
      payMethod: this.member.payMethod,
    });
  }
}
