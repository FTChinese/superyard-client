import { Component, OnInit } from '@angular/core';
import { AndroidRelease } from 'src/app/data/schema/android';
import { FormService } from 'src/app/shared/service/form.service';
import { ReleaseForm } from '../../schema/release-form';
import { AndroidService } from 'src/app/data/service/android.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { buildReleaseControls } from '../../schema/release-form';
import { Button } from 'src/app/shared/widget/button';
import { DynamicControl } from 'src/app/shared/widget/control';

@Component({
  selector: 'app-create-release',
  templateUrl: './create-release.component.html',
  styleUrls: ['./create-release.component.scss'],
  providers: [FormService],
})
export class CreateReleaseComponent implements OnInit {

  release: AndroidRelease;

  controls: DynamicControl[];
  button: Button = Button.primary().setName('Save');

  constructor(
    private androidService: AndroidService,
    private formService: FormService,
    readonly progress: ProgressService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    // release-form
    this.formService.formSubmitted$.subscribe(data => {
      const formData: ReleaseForm = JSON.parse(data);
      console.log('Release data %o', formData);

      this.create(formData);
    });
  }

  /**
   * @description Handle search form.
   * @param kw - version tag.
   */
  onSearch(kw: string) {

    if (!kw.startsWith('v')) {
      kw = '' + kw;
    }

    this.progress.start();
    this.androidService.ghRelease(kw)
      .subscribe({
        next: data => {
          console.log(data);
          this.progress.stop();
          // Show form.
          this.release = data;

          this.controls = buildReleaseControls(data);
        },
        error: err => {
          this.progress.stop();
          const reqErr = new RequestError(err);
          console.log(err);

          this.toast.error(reqErr.message);
        }
      });
  }

  getLatestRelease() {
    this.progress.start();

    this.androidService.ghLatest()
      .subscribe({
        next: data => {
          console.log(data);
          this.progress.stop();
          // Show form.
          this.release = data;

          this.controls = buildReleaseControls(data);
        },
        error: err => {
          this.progress.stop();
          const reqErr = new RequestError(err);
          console.log(err);

          this.toast.error(reqErr.message);
        }
      });
  }

  private create(release: ReleaseForm) {
    this.androidService.createRelease(release)
      .subscribe({
        next: ok => {
          this.router.navigate(['../'], {
            relativeTo: this.route,
          });
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          const reqErr = new RequestError(err);

          this.formService.sendError(reqErr);
        },
      });
  }
}
