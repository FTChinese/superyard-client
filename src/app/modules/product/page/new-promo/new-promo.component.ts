import { Component, OnInit } from '@angular/core';
import { PromoReq, buildPromoReq, buildPromoControls } from '../../schema/PromoForm';
import { PromoForm } from "../../schema/PromoForm";
import { Button } from 'src/app/shared/widget/button';
import { ToastService } from 'src/app/shared/service/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isoOffset, concateISODateTime, DateTime } from 'src/app/data/formatter/datetime';
import { FormService } from 'src/app/shared/service/form.service';

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

  constructor(
    private formService: FormService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formService.formCreated$.subscribe(form => {
      form.valueChanges.subscribe((data: PromoForm) => {
        this.preview = data;
        this.startTime = this.formatDatetime(data.startUtc);
        this.endTime = this.formatDatetime(data.endUtc);
      });
    });

    this.formService.formSubmitted$.subscribe(data => {
      const formData: PromoForm = JSON.parse(data);

      const reqData: PromoReq = buildPromoReq(formData, this.timezone);

      console.log('Submitting promo: %o', reqData);
    });
  }

  private formatDatetime(dt: DateTime): string | null {
    if (!dt.date || !dt.time) {
      return null;
    }

    return concateISODateTime({
      ...dt,
      zone: this.timezone,
    });
  }

  // onSubmit() {
  //   const formData: PromoForm = this.form.value;

  //   this.submitting = true;

  //   const reqData: PromoReq = buildPromoReq(formData, this.timezone);

  //   console.log('Submitting promo: %o', reqData);
  // }

  private create(reqData: PromoReq) {
    this.toast.info('Creating promo...');

    this.router.navigate(['../../'], {
      relativeTo: this.route
    });
  }
}
