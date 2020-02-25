import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IReaderAccount } from 'src/app/models/reader';
import { SubStatus } from 'src/app/models/enums';

interface Option {
  value: SubStatus;
  text: string;
}

@Component({
  selector: 'app-edit-membership',
  templateUrl: './edit-membership.component.html',
  styleUrls: ['./edit-membership.component.scss']
})
export class EditMembershipComponent implements OnInit {

  // NOTE: the data is asynchronously fetched from server.
  // See https://scotch.io/tutorials/3-ways-to-pass-async-data-to-angular-2-child-components
  // how to pass async data to child component.
  @Input() reader: IReaderAccount;
  // True for on, false for off.
  @Output() toggleForm = new EventEmitter<boolean>();

  subsForm = this.formBuilder.group({
    tier: ['', [Validators.required]],
    cycle: ['', [Validators.required]],
    expireDate: ['', Validators.required],
    paymentMethod: [''],
    stripeSubId: [null],
    stripePlanId: [null],
    autoRenewal: [false],
    appleSubId: [null],
    status: [null],
  });

  statusOptions: Option[] = [
    {
      value: 'active',
      text: 'Active',
    },
    {
      value: 'canceled',
      text: 'Canceled',
    },
    {
      value: 'incomplete',
      text: 'Incomplete',
    },
    {
      value: 'incomplate_expired',
      text: 'Incomplete Expired',
    },
    {
      value: 'past_due',
      text: 'Past Due',
    },
    {
      value: 'trialing',
      text: 'Trialing',
    },
    {
      value: 'unpaid',
      text: 'Unpaid'
    }
  ];

  get hasSub(): boolean {
    if (!this.reader) {
      return false;
    }

    if (!this.reader.membership.id) {
      return false;
    }

    return true;
  }

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    if (this.hasSub) {
      this.subsForm.patchValue(Object.assign({}, this.reader.membership));
    }
  }

  onSubmit() {
    console.log(this.subsForm.value);
    // this.subsForm.disable();
  }

  cancel() {
    console.log('Cancel form')
    if (this.hasSub) {
      this.subsForm.disable();
    } else {
      this.toggleForm.emit(false);
    }
  }
}
