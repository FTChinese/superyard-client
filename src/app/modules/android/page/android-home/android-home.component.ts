import { Component, OnInit } from '@angular/core';
import { AndroidRelease } from 'src/app/data/schema/android';
import { AndroidService } from 'src/app/data/service/android.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/shared/service/toast.service';
import { RequestError, serviceNames } from 'src/app/data/schema/request-result';

@Component({
  selector: 'app-android-home',
  templateUrl: './android-home.component.html',
  styleUrls: ['./android-home.component.scss'],
})
export class AndroidHomeComponent implements OnInit {

  releases: AndroidRelease[];

  constructor(
    private service: AndroidService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.service.listReleases()
      .subscribe({
        next: data => {
          this.releases = data;
        },
        error: (err: HttpErrorResponse) => {
          const errResp = new RequestError(err, serviceNames.android);

          this.toast.error(errResp.toString());
        },
      });
  }
}
