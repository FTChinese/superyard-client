import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Promo } from 'src/app/data/schema/paywall';
import { MetaItem } from 'src/app/shared/widget/meta-data';
import { ModalService } from 'src/app/shared/service/modal.service';
import { PaywallService } from '../../service/paywall.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';

/**
 * This component is used to show the promotion details on the paywall page.
 */
@Component({
  selector: 'app-promo-card',
  templateUrl: './promo-card.component.html',
  styleUrls: ['./promo-card.component.scss']
})
export class PromoCardComponent implements OnInit {
  // It uses the shared BaseBanner fieds to reuse BannerBoxComponent.
  @Input() promo: Promo;
  @Output() dropped = new EventEmitter();

  get isEmpty(): boolean {
    return !this.promo || !this.promo.id;
  }

  get metaItems(): MetaItem[] {
    if (this.isEmpty) {
      return [];
    }

    return [
      {
        label: 'Created by',
        value: this.promo.createdBy
      },
      {
        label: 'Create at',
        value: this.promo.createdUtc
      },
    ];
  }

  constructor(
    readonly modal: ModalService,
    private paywallService: PaywallService,
    private toast: ToastService,
    private progress: ProgressService,
  ) { }

  ngOnInit(): void {
  }

  openModal() {
    this.modal.open();
  }

  onDrop() {
    this.progress.start();

    this.paywallService.dropPromo()
      .subscribe({
        next: ok => {
          this.toast.info('Promo is removed from paywall');
          this.progress.stop();
          this.modal.close();
          this.dropped.emit();
        },
        error: (err: HttpErrorResponse) => {
          this.progress.stop();

          const reqErr = new RequestError(err);
          this.toast.error(reqErr.message);
        }
      });
  }
}
