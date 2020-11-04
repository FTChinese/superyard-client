import { Component, OnInit } from '@angular/core';
import { PromoReq, buildPromoReq, buildPromoControls } from '../../schema/PromoForm';
import { PromoForm } from '../../schema/PromoForm';
import { Button } from 'src/app/shared/widget/button';
import { ToastService } from 'src/app/shared/service/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { concatISODateTime, isoOffset } from 'src/app/data/formatter/datetime';
import { FormService } from 'src/app/shared/service/form.service';
import { PaywallService } from '../../service/paywall.service';
import { Promo } from 'src/app/data/schema/paywall';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-promo',
  templateUrl: './new-promo.component.html',
  styleUrls: ['./new-promo.component.scss'],
  providers: [FormService],
})
export class NewPromoComponent implements OnInit {

  // Controls of BaserBanner
  controls = buildPromoControls();

  // periodSets = periodSets;
  preview: PromoForm;
  startTime: string;
  endTime: string;

  button = Button.primary().setName('Save and apply it to current paywall');

  timezone = isoOffset(new Date());

  form: FormGroup;

  constructor(
    private formService: FormService,
    private paywallService: PaywallService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.formService.formCreated$.subscribe(form => {
      form.valueChanges.subscribe((data: PromoForm) => {
        console.log('Banner form data %o', data);
        this.preview = data;
        this.startTime = concatISODateTime({
          ...this.preview.startUtc,
          zone: this.timezone
        });
        this.endTime = concatISODateTime({
          ...this.preview.endUtc,
          zone: this.timezone,
        });
      });
    });

    this.formService.formSubmitted$.subscribe(data => {
      const formData: PromoForm = JSON.parse(data);

      const reqData: PromoReq = buildPromoReq(formData, this.timezone);

      this.create(reqData);
    });
  }

  private create(reqData: PromoReq) {
    this.toast.info('Creating promo...');

    this.paywallService.createPromo(reqData)
      .subscribe({
        next: (promo: Promo) => {
          console.log('Created promo %o', promo);

          this.router.navigate(['../'], {
            relativeTo: this.route
          });
        },
        error: (err: HttpErrorResponse) => {
          const errRes = new RequestError(err);
          this.formService.sendError(errRes);
        }
      });
  }
}
