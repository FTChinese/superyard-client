import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { Membership } from 'src/app/data/schema/membership';
import { ReaderAccount } from 'src/app/data/schema/reader';
import { RequestError } from 'src/app/data/schema/request-result';
import { FormService } from 'src/app/shared/service/form.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { Button } from 'src/app/shared/widget/button';
import { DynamicControl, InputControl } from 'src/app/shared/widget/control';
import { IAPForm } from '../../schema/iap-form';
import { ReaderService } from '../../service/reader.service';

/**
 * IAPFormComponent let user to enter an original transaction id to link it
 * to this account.
 */
@Component({
  selector: 'app-iap-form',
  templateUrl: './iap-form.component.html',
  styleUrls: ['./iap-form.component.scss'],
  providers: [FormService]
})
export class IapFormComponent implements OnInit {

  @Input() account: ReaderAccount;
  @Output() succeeded = new EventEmitter<Membership>();

  controls: DynamicControl[] = [
    new InputControl({
      value: null,
      key: 'originalTxId',
      validators: [Validators.required],
      label: 'Original Transaction ID',
      type: 'text'
    })
  ];

  button: Button = Button.primary().setName('Save');

  constructor(
    private formService: FormService,
    private readerService: ReaderService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.formService.formCreated$.subscribe(form => {
      form.patchValue({
        originalTxId: this.account.membership.appleSubsId
      });
    });

    this.formService.formSubmitted$.subscribe(data => {
      const formData: IAPForm = JSON.parse(data);

      console.log('IAP: %o', formData);

      this.link(formData);
    });
  }

  private link(formData: IAPForm) {
    this.readerService.linkIAP(this.account.ftcId, formData)
      .subscribe({
        next: m => {
          this.toast.info('IAP linked to this account');
          this.formService.enable(true);
          this.succeeded.emit(m);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);

          const reqErr = new RequestError(err);

          this.formService.sendError(reqErr);

          this.toast.error(err.message);
        }
      });
  }
}
