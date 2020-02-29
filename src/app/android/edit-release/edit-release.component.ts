import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRelease } from 'src/app/models/android';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-release',
  templateUrl: './edit-release.component.html',
  styleUrls: ['./edit-release.component.scss']
})
export class EditReleaseComponent implements OnInit {
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

  @Output() sumitted: EventEmitter<IRelease>;

  releaseForm = this.formBuilder.group({
    versionName: ['', [Validators.required]],
    versionCode: [0, [Validators.required]],
    body: [''],
    apkUrl: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.releaseForm.patchValue({
      versionName: this.release.versionName,
      versionCode: this.release.versionCode,
      body: this.release.body,
      apkUrl: this.release.apkUrl,
    });
  }

  onSubmit() {
    this.sumitted.emit(this.releaseForm.value);
  }

  cancel() {

  }
}
