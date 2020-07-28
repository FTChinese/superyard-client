import { Component, OnInit, Input } from '@angular/core';
import { Membership, isMember } from 'src/app/data/schema/reader';
import { Validators, FormGroup } from '@angular/forms';
import { SelectOption, Tier, Cycle } from 'src/app/data/schema/enum';
import { DynamicControl, DropdownControl, InputControl } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { MemberForm } from 'src/app/data/schema/form-data';

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
      options: [
        {
          disabled: false,
          value: 'standard',
          name: 'Standard',
        },
        {
          disabled: false,
          value: 'premium',
          name: 'Premium'
        }
      ]
    }),
    new DropdownControl({
      value: null,
      key: 'cycle',
      validators: [Validators.required],
      label: 'Cycle',
      options: [
        {
          disabled: false,
          value: 'month',
          name: 'Month',
        },
        {
          disabled: false,
          value: 'year',
          name: 'Year'
        }
      ],
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
      options: [
        {
          disabled: false,
          value: 'alipay',
          name: 'Alipay',
        },
        {
          disabled: false,
          value: 'wecaht',
          name: 'Wechat Pay'
        }
      ]
    })
  ];

  button: Button = Button.primary().setName('Save');

  form: FormGroup;

  tierOpts: SelectOption<Tier>[];
  cycleOpts: SelectOption<Cycle>[];

  constructor(
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.formService.formCreated$
      .subscribe(form => {
        form.get('tier').valueChanges
          .subscribe((tier: Tier) => {
            this.dynamicControls[1] = this.buildCycleControl(tier);
          });

        this.form = form;
        this.patchForm();
      });

    this.formService.formSubmitted$
      .subscribe(data => {
        const formData: MemberForm = JSON.parse(data);

        console.log(formData);
      });
  }

  private buildCycleControl(tierSelected?: Tier): DropdownControl {
    return new DropdownControl({
      value: null,
      key: 'cycle',
      validators: [Validators.required],
      label: 'Cycle',
      options: [
        {
          disabled: tierSelected === 'premium',
          value: 'month',
          name: 'Month',
        },
        {
          disabled: false,
          value: 'year',
          name: 'Year'
        }
      ],
    });
  }
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

  onSubmit() {

  }
}
