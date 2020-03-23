import { Component, OnInit, Input } from '@angular/core';
import { IAccessToken, IApiApp } from 'src/app/models/oauth';
import { FormBuilder, Validators } from '@angular/forms';
import { AppFormService } from '../app-form.service';

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.scss']
})
export class AppFormComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private _app: IApiApp;

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
    homeUrl: [null, Validators.required],
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
      .subscribe(reqErr => console.log(reqErr));
  }

  onSubmit() {
    this.formService.submitForm(this.appForm.value);
  }
}


function slugify(str: string): string {
  return str.toLowerCase().replace(' ', '-');
}
