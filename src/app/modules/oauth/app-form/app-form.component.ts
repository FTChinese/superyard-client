import { Component, OnInit, Input } from '@angular/core';
import { IApiApp, IAppBase } from 'src/app/data/schema/oauth';
import { FormBuilder, Validators } from '@angular/forms';
import { AppFormService } from '../app-form.service';

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.scss']
})
export class AppFormComponent implements OnInit {

  formErr: Partial<IAppBase> = {};
  errMsg: string;

  @Input()
  set app(app: IApiApp) {
    this.appForm.patchValue({
      name: app.name,
      slug: app.slug,
      repoUrl: app.repoUrl,
      homeUrl: app.homeUrl,
      description: app.description,
      callbackUrl: app.callbackUrl
    });
  }

  appForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    slug: [''],
    repoUrl: ['', [Validators.required]],
    homeUrl: [null],
    description: [null],
    callbackUrl: [null],
  });

  constructor(
    private formBuilder: FormBuilder,
    private formService: AppFormService,
  ) { }

  /**
   * Monitor the name field value change
   * and sync the slugified version.
   * If you use a template reference variable on the `name` field
   * and set the `slug` field to its value,
   * Angular only updates the UI;
   * it does not submit the value.
   */
  ngOnInit(): void {
    this.appForm.get('name')
      .valueChanges
      .subscribe(name => {
        this.appForm.patchValue({
          slug: slugify(name),
        });
      });

    this.formService
      .errorReceived$
      .subscribe(reqErr => {
        console.log(reqErr);

        this.appForm.enable();

        if (reqErr.unprocessable) {
          this.formErr = reqErr.toFormFields;

          return;
        }

        this.errMsg = reqErr.message;
      });
  }

  onSubmit() {
    console.log(this.appForm.value);

    if (this.appForm.invalid) {
      if (this.appForm.getError('required', 'name')) {
        this.formErr.name = 'App name is required';
      }

      if (this.appForm.getError('required', 'repoUrl')) {
        this.formErr.repoUrl = 'Please supply the source code url of this app';
      }

      return;
    }

    this.formService.submitForm(this.appForm.value);

    // NOTE: must not put this line before submite data;
    // otherwise the form data is empty.
    this.appForm.disable();
  }

  onDismiss() {
    this.errMsg = null;
  }

}


function slugify(str: string): string {
  return str.toLowerCase().replace(' ', '-');
}
