import { Component, OnInit } from '@angular/core';
import { PricedProduct, Plan, Discount, zeroDiscount } from 'src/app/data/schema/product';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { products } from 'src/app/data/schema/mocker';
import { ModalService } from 'src/app/shared/service/modal.service';
import { MenuItem, SelectedItem } from 'src/app/shared/widget/menu';
import { ToastService } from 'src/app/shared/service/toast.service';
import { MetaItem } from 'src/app/shared/widget/meta-data';

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

  product: PricedProduct;
  discountTarget: Plan;

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

  get priceModalOn(): boolean {
    return this.modal.on && this.modal.id === this.modalNewPrice;
  }

  get newDiscountModalOn(): boolean {
    return this.modal.on && this.modal.id === this.modalNewDiscount;
  }

  get removeDiscountModalOn(): boolean {
    return this.modal.on && this.modal.id === this.modalRemoveDiscount;
  }

  constructor(
    private route: ActivatedRoute,
    readonly modal: ModalService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');

        return of(products.get(id));
      })
    )
    .subscribe(prod => {
      this.product = prod;
    });
  }

  // Use sectionIndex to find the plan, cellIndex to identify which menu is cliekd.
  onSelectMenu(position: SelectedItem) {
    console.log('Selected %o', position);

    const plan = this.product.plans[position.sectionIndex];

    if (!plan) {
      this.toast.error(`Plan not found at position ${position.sectionIndex}`);
      return;
    }

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

    const plan = this.product.plans
      .find(p => p.id === this.discountTarget.id);
    if (plan) {
      plan.discount = discount;
    }

    this.discountTarget = undefined;
  }

  // Remove discount from the discountTarget.
  onDropDiscount() {
    this.modal.close();

    const plan = this.product.plans
      .find(p => p.id === this.discountTarget.id);

    if (plan) {
      plan.discount = zeroDiscount();
    }

    this.discountTarget = undefined;

    this.toast.info('Discount dropped!');
  }

  // Open new price form dialog.
  onNewPrice() {
    this.modal.open(this.modalNewPrice);
  }

  // Close price form after created.
  onPriceCreated(plan: Plan) {
    console.log('New plan: %o', plan);

    this.modal.close();
    this.product.plans.unshift(plan);

    console.log(this.product.plans);
  }

  // Put a plan under a product's default list so that it is visible on paywall.
  // Request data: product_id: string, plan_id: string.
  onDefaultPlan(plan: Plan) {
    for (const p of this.product.plans) {
      if (p.cycle !== plan.cycle) {
        continue;
      }

      if (p.id !== plan.id) {
        p.isActive = false;
      } else {
        p.isActive = true;
      }
    }
  }
}
