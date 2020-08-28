import { Component, OnInit } from '@angular/core';
import { Paywall} from 'src/app/data/schema/paywall';
import { PaywallService } from '../../service/paywall.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';
import { ProgressService } from 'src/app/shared/service/progress.service';

@Component({
  selector: 'app-paywall-home',
  templateUrl: './paywall-home.component.html',
  styleUrls: ['./paywall-home.component.scss']
})
export class PaywallHomeComponent implements OnInit {

  paywall: Paywall;

  loadingError: string;
  notFound: boolean;

  constructor(
    private paywallService: PaywallService,
    private toast: ToastService,
    readonly progress: ProgressService
  ) {
    this.progress.start();
  }

  ngOnInit(): void {
    this.loadingError = undefined;
    this.notFound = false;

    this.paywallService.loadPaywall()
      .subscribe({
        next: pw => {
          console.log('Paywall %o', pw);

          this.progress.stop();
          this.paywall = pw;

          console.log(this.progress.on);
        },
        error: (err: HttpErrorResponse) => {
          this.progress.stop();

          const errRes = new RequestError(err);
          if (errRes.notFound) {
            this.notFound = true;
            return;
          }
          this.loadingError = errRes.message;
        }
      });
  }

  rebuild() {
    this.toast.info('Refreshing Subscription API Cache...');
    this.progress.start();
  }
}
