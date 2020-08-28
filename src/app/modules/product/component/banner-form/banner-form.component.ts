import { Component, Input, OnInit } from '@angular/core';
import { bannerControls } from '../../schema/BannerForm';
import { BannerForm } from '../../schema/BannerForm';
import { PaywallService } from '../../service/paywall.service';
import { FormService } from 'src/app/shared/service/form.service';
import { Button } from 'src/app/shared/widget/button';
import { Banner } from 'src/app/data/schema/paywall';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/service/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';

@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.scss']
})
export class BannerFormComponent implements OnInit {

  // DO NOT change banner data once set from host component!
  @Input() banner: Banner;
  preview: BannerForm;

  controls = bannerControls;
  button = Button.primary().setName('Save');
  form: FormGroup;

  // If banner is not set, it indicates creating a new one; otherwise it is updating.
  get isUpdating(): boolean {
    return !!this.banner;
  }

  get title(): string {
    return this.banner ? 'Edit Paywall Banner' : 'New Paywall Banner';
  }

  constructor(
    private formService: FormService,
    private paywallService: PaywallService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {
  }

  ngOnInit(): void {
    this.formService.formCreated$.subscribe(form => {
      this.form = form;

      this.setupPreview();

      if (this.banner) {
        this.patchForm();
      }
    });


    this.formService.formSubmitted$
      .subscribe(data => {
        const formData: BannerForm = JSON.parse(data);

        console.log('Sumbitting banner form %o', formData);

        // If banner exists, it is updating; otherwise it is creating.
        if (this.banner) {
          this.update(formData);
        } else {
          this.create(formData);
        }
      });

  }

  private setupPreview() {
    this.form.valueChanges
      .subscribe((data: BannerForm) => {
        console.log('Banner form data %o', data);
        this.preview = data;
      });
  }

  private patchForm() {
    this.form.patchValue({
      heading: this.banner.heading,
      subHeading: this.banner.subHeading,
      coverUrl: this.banner.coverUrl,
      content: this.banner.content
    });
  }

  private create(formData: BannerForm) {
    this.toast.info('Creating new banner...');

    this.paywallService.createBanner(formData)
      .subscribe({
        next: (b: Banner) => {
          console.log('Banner created %o', b);

          // Redirect back to paywall page once created.
          this.router.navigate(['../../'], {
            relativeTo: this.route
          });
        },
        error: (err: HttpErrorResponse) => {
          const respErr = new RequestError(err);
          this.formService.sendError(respErr);
        }
      });
  }

  private update(formData: BannerForm) {
    this.toast.info('Updating...');

    this.paywallService.updateBanner(formData)
      .subscribe({
        next: (b: Banner) => {
          console.log('Banner updated %o', b);

          this.toast.info('Banner updated successfully!');
          this.formService.enable(true);
        },
        error: (err: HttpErrorResponse) => {
          const respErr = new RequestError(err);
          this.formService.sendError(respErr);
        }
      });

    this.formService.enable(true);
  }
}
