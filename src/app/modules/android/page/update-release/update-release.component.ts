import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AndroidRelease } from 'src/app/data/schema/android';
import { AndroidService } from 'src/app/data/service/android.service';
import { RequestError, serviceNames } from 'src/app/data/schema/request-result';
import { ToastService } from 'src/app/shared/service/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ReleaseForm } from 'src/app/data/schema/form-data';
import { FormService } from 'src/app/shared/service/form.service';

@Component({
  selector: 'app-update-release',
  templateUrl: './update-release.component.html',
  styleUrls: ['./update-release.component.scss'],
  providers: [FormService],
})
export class UpdateReleaseComponent implements OnInit {

  release: AndroidRelease;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private androidService: AndroidService,
    private formService: FormService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    // Get path parameter.
    this.route.paramMap.pipe(
      switchMap(params => {
        const tag = params.get('tag');

        return this.androidService.loadRelease(tag);
      })
    ).subscribe({
      next: data => this.release = data,
      error: (err: HttpErrorResponse) => {
        const errReq = new RequestError(err, serviceNames.android);

        this.toast.error(errReq.toString());
      },
    });

    // Received form data.
    this.formService.formSubmitted$
      .subscribe(data => {
        const formData: ReleaseForm = JSON.parse(data);

        this.onSubmit(formData);
      });
  }

  // Submit the data
  onSubmit(release: ReleaseForm) {

    this.androidService
      .updateRelease(release)
      .subscribe({
        next: ok => {
          if (ok) {
            this.toast.info('Updated successfully!');
            this.router.navigate(['../../'], {
              relativeTo: this.route
            });
          }
        },
        error: (err: HttpErrorResponse) => {
          const reqErr = new RequestError(err, serviceNames.android);

          this.formService.sendError(reqErr);
        }
      });
  }
}
