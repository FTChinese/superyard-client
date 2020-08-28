import { Component, OnInit } from '@angular/core';
import { ExpandedPlan, Discount, zeroDiscount, Product, Plan } from 'src/app/data/schema/product';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { ModalService } from 'src/app/shared/service/modal.service';
import { MenuItem, SelectedItem } from 'src/app/shared/widget/menu';
import { ToastService } from 'src/app/shared/service/toast.service';
import { MetaItem } from 'src/app/shared/widget/meta-data';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ProductService } from '../../service/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  // Used to identify which modal to open and close.
  private modalNewDiscount = 'd';
  private modalRemoveDiscount = 'r';
  private modalNewPrice = 'p';

  product: Product;
  plans: ExpandedPlan[];

  discountTarget: ExpandedPlan;

  get metaItems(): MetaItem[] {
    if (!this.product) {
      return [];
    }

    return [
      {
        label: 'Updated',
        value: this.product.updatedUtc
      },
      {
        label: 'Created',
        value: this.product.createdUtc
      },
      {
        label: 'Creator',
        value: this.product.createdBy
      }
    ];
  }

  menuItems: MenuItem[] = [
    {
      id: this.modalNewDiscount,
      name: 'New discount'
    },
    {
      name: '',
      divider: true,
    },
    {
      id: this.modalRemoveDiscount,
      name: 'Drop discount',
      danger: true,
    }
  ];

  get priceModalTitle(): string {
    return `New pricing for ${this.product.tier} product`;
  }

  /**
   * Open the creating pricing plan dialog.
   */
  get priceModalOn(): boolean {
    return this.modal.on && this.modal.id === this.modalNewPrice;
  }

  /**
   * Open the creating discount dialog.
   */
  get newDiscountModalOn(): boolean {
    return this.modal.on && this.modal.id === this.modalNewDiscount;
  }

  /**
   * Open the drop discount dialog
   */
  get removeDiscountModalOn(): boolean {
    return this.modal.on && this.modal.id === this.modalRemoveDiscount;
  }

  constructor(
    private route: ActivatedRoute,
    readonly modal: ModalService,
    private toast: ToastService,
    readonly progress: ProgressService,
    private productService: ProductService
  ) {
    this.progress.start();
   }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const productId = params.get('id');

        return forkJoin([
          this.productService.loadProduct(productId),
          this.productService.listPlans(productId)
        ]);
      })
    )
    .subscribe({
      next: ([prod, plans]) => {
        this.progress.stop();

        this.product = prod;
        this.plans = plans;
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();

        const reqErr = new RequestError(err);
        this.toast.error(reqErr.message);
      }
    });
  }

  // Use sectionIndex to find the plan, cellIndex to identify which menu is cliekd.
  onSelectMenu(position: SelectedItem) {
    console.log('Selected %o', position);

    const plan = this.plans[position.sectionIndex];

    if (!plan) {
      this.toast.error(`Plan not found at position ${position.sectionIndex}`);
      return;
    }

    // Remember which plan we are manipulating.
    this.discountTarget = plan;

    const menuItem = this.menuItems[position.cellIndex];

    switch (menuItem.id) {
      case this.modalNewDiscount:
        this.modal.open(this.modalNewDiscount);
        break;

      case this.modalRemoveDiscount:
        if (!plan.discount.id) {
          this.toast.error('This price does not have discount');
          this.discountTarget = undefined;
          return;
        }

        this.modal.open(this.modalRemoveDiscount);
        break;

      default:
        this.toast.error(`Menu command at postion ${position.cellIndex} not found`);
    }
  }

  // Close discount form dialog after created.
  onDiscountCreated(discount: Discount) {
    console.log(discount);
    this.modal.close();

    const plan = this.plans
      .find(p => p.id === this.discountTarget.id);
    if (plan) {
      plan.discount = discount;
    }

    this.discountTarget = undefined;
  }

  // Remove discount from the discountTarget.
  onDropDiscount() {
    this.progress.start();

    this.productService.dropDiscount(this.discountTarget.id)
      .subscribe({
        next: ok => {
          console.log('Discount droppped %s', ok);
          const plan = this.plans
            .find(p => p.id === this.discountTarget.id);

          if (plan) {
            plan.discount = zeroDiscount();
          }

          this.discountTarget = undefined;
          this.toast.info('Discount dropped!');
          this.progress.stop();
          this.modal.close();
        },
        error: (err: HttpErrorResponse) => {
          this.progress.stop();

          const reqErr = new RequestError(err);
          this.toast.error(reqErr.message);
        }
      });
  }

  // Open new price form dialog.
  onNewPrice() {
    this.modal.open(this.modalNewPrice);
  }

  /**
   * @description Close price form after created.
   */
  onPriceCreated(plan: Plan) {
    console.log('New plan: %o', plan);

    this.modal.close();
    // API returns a Plan type. We need to fill the missing discount field which is always a zero value.
    this.plans.unshift({
      ...plan,
      discount: zeroDiscount(),
    });

    console.log(this.plans);
  }

  /**
   * @description Put a plan under a product's default list so that it is visible on paywall.
   * Request data: product_id: string, plan_id: string.
   */
  onDefaultPlan(plan: ExpandedPlan) {
    this.progress.start();

    this.productService.activatePlan(plan.id)
      .subscribe({
        next: () => {
          this.progress.stop();

          // Change local data's active state.
          this.plans.forEach(p => {
            if (p.cycle !== plan.cycle) {
              return;
            }

            if (p.id !== plan.id) {
              p.isActive = false;
            } else {
              p.isActive = true;
            }
          });
        },
        error: (err: HttpErrorResponse) => {
          this.progress.stop();

          const reqErr = new RequestError(err);
          this.toast.error(reqErr.message);
        }
      });
  }
}
