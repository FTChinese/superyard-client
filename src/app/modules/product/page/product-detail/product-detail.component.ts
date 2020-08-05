import { Component, OnInit } from '@angular/core';
import { Product, Plan, Discount } from 'src/app/data/schema/product';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { products } from 'src/app/data/schema/mocker';
import { ModalService } from 'src/app/shared/service/modal.service';
import { MenuItem, SelectedItem } from 'src/app/shared/widget/menu';
import { ToastService } from 'src/app/shared/service/toast.service';

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
  discountTarget: Plan;

  menuItems: MenuItem[] = [
    {
      id: this.modalNewDiscount,
      name: 'Modify discount'
    },
    {
      name: '',
      divider: true,
    },
    {
      id: this.modalRemoveDiscount,
      name: 'Remove discount',
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
        this.modal.open(this.modalRemoveDiscount);
        break;

      default:
        this.toast.error(`Menu command at postion ${position.cellIndex} not found`);
    }
  }

  onDiscountCreated(discount: Discount) {
    this.modal.close();
    console.log(discount);
    this.discountTarget = undefined;
  }

  onDiscountRemoved(ok: boolean) {
    this.modal.close();
    this.discountTarget = undefined;
  }

  // Open new price form dialog.
  onNewPrice() {
    this.modal.open(this.modalNewPrice);
  }

  // Close price form after created.
  onPriceCreated(plan: Plan) {
    console.log(plan);
    this.modal.close();
    this.toast.info('New price is created. Refreshing...');
    // TODO: refresh prices list.
  }

  // Put a plan under a product's default list so that it is visible on paywall.
  // Request data: product_id: string, plan_id: string.
  onDefaultPlan(plan: Plan) {
  }
}
