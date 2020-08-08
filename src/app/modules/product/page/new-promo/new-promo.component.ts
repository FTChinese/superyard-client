import { Component, OnInit } from '@angular/core';
import { bannerControls, periodSets, PromoForm, PromoReq, buildPromoReq, datetimeControls } from '../../schema/control-builder';
import { FormGroup } from '@angular/forms';
import { Button } from 'src/app/shared/widget/button';
import { DynamicControlService } from 'src/app/shared/service/dynamic-control.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isoOffset, concateISODateTime, DateTime } from 'src/app/data/formatter/datetime';
import { GroupControl } from 'src/app/shared/widget/control';
import { FormService } from 'src/app/shared/service/form.service';

@Component({
  selector: 'app-new-promo',
  templateUrl: './new-promo.component.html',
  styleUrls: ['./new-promo.component.scss'],
  providers: [FormService],
})
export class NewPromoComponent implements OnInit {

  // Controls of BaserBanner
  controls = [
    ...bannerControls,
    new GroupControl({
      key: 'startUtc',
      label: 'Start Datetime',
      controls: datetimeControls
    }),
    new GroupControl({
      key: 'endUtc',
      label: 'End Datetime',
      controls: datetimeControls
    })
  ];

  periodSets = periodSets;
  preview: PromoForm;
  startTime: string;
  endTime: string;

  form: FormGroup;
  button = Button.primary().setName('Save and apply it to current paywall');

  timezone = isoOffset(new Date());

  set submitting(yes: boolean) {
    if (yes) {
      this.form.disable();
      this.button.start();
    } else {
      this.form.enable();
      this.button.stop();
    }
  }

  constructor(
    private controlService: DynamicControlService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.controlService.toFormGroup(this.controls);
    // periodSets.forEach(grp => {
    //   this.form.addControl(grp.groupName, this.controlService.toFormGroup(grp.controls));
    // });

    this.form.valueChanges.subscribe((data: PromoForm) => {
      this.preview = data;
      this.startTime = this.formatDatetime(data.startUtc);
      this.endTime = this.formatDatetime(data.endUtc);
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

  onSubmit() {
    const formData: PromoForm = this.form.value;

    this.submitting = true;

    const reqData: PromoReq = buildPromoReq(formData, this.timezone);

    console.log('Submitting promo: %o', reqData);
  }

  private create(reqData: PromoReq) {
    this.toast.info('Creating promo...');

    this.router.navigate(['../../'], {
      relativeTo: this.route
    });
  }
}
