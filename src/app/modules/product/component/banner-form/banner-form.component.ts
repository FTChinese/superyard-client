import { Component, Input, OnInit } from '@angular/core';
import { bannerControls, BannerForm } from '../../schema/control-builder';
import { FormService } from 'src/app/shared/service/form.service';
import { Button } from 'src/app/shared/widget/button';
import { Banner } from 'src/app/data/schema/paywall';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/service/toast.service';

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

  get title(): string {
    return this.banner ? 'Edit Paywall Banner' : 'New Paywall Banner';
  }

  constructor(
    private formService: FormService,
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

        if (this.banner) {
          this.create(formData);
        } else {
          this.update(formData);
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
      content: this.banner.content.join('\n')
    });
  }

  private create(formData: BannerForm) {
    this.toast.info('Saving new banner...');

    this.router.navigate(['../../'], {
      relativeTo: this.route
    });
  }

  private update(formData: BannerForm) {
    this.toast.info('Updating...');

    this.formService.enable(true);
  }
}
