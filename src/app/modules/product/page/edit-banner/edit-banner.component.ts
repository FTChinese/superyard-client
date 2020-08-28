import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/shared/service/form.service';
import { Banner } from 'src/app/data/schema/paywall';
import { PaywallService } from '../../service/paywall.service';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';

@Component({
  selector: 'app-edit-banner',
  templateUrl: './edit-banner.component.html',
  styleUrls: ['./edit-banner.component.scss'],
  providers: [FormService],
})
export class EditBannerComponent implements OnInit {

  banner: Banner;
  loadingError: string;

  constructor(
    private paywallService: PaywallService,
    private progress: ProgressService,
  ) {
    this.progress.start();
  }

  ngOnInit(): void {


    this.paywallService.loadBanner()
      .subscribe({
        next: (b: Banner) => {
          this.progress.stop();

          this.banner = b;
        },
        error: (err: HttpErrorResponse) => {
          this.progress.stop();

          const errRes = new RequestError(err);

          if (errRes.notFound) {
            this.loadingError = 'Not Found';
            return;
          }

          this.loadingError = errRes.message;
        }
      });
  }
}
