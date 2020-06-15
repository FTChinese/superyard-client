import { Component, Input} from '@angular/core';
import { IRelease } from 'src/app/data/schema/android';
import { FormBuilder, Validators } from '@angular/forms';
import { ReleaseService } from '../release.service';

@Component({
  selector: 'app-edit-release',
  templateUrl: './edit-release.component.html',
  styleUrls: ['./edit-release.component.scss']
})
export class EditReleaseComponent {
  // tslint:disable-next-line:variable-name
  private _release: IRelease;

  @Input()
  set release(release: IRelease) {
    this.releaseForm.patchValue({
      versionName: release.versionName,
      versionCode: release.versionCode,
      body: release.body,
      apkUrl: release.apkUrl,
    });

    this._release = release;
  }

  get release(): IRelease {
    return this._release;
  }

  // @Output() sumitted: EventEmitter<IRelease>;

  releaseForm = this.formBuilder.group({
    versionName: ['', [Validators.required]],
    versionCode: [0, [Validators.required]],
    body: [''],
    apkUrl: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private releaseService: ReleaseService,
  ) {
    // Waiting to show any HTTP request errors.
    this.releaseService.errorReceived$.subscribe(
      reqErr => {
        console.log(reqErr);
      }
    );
  }

  // Pass form data to parent host using service.
  onSubmit() {
    this.releaseService.submitForm(this.releaseForm.value);
  }
}
