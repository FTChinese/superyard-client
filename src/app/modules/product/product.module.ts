import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductHomeComponent } from './page/product-home/product-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductContentComponent } from './component/product-content/product-content.component';
import { BuilderComponent } from './page/builder/builder.component';
import { PlanListComponent } from './component/plan-list/plan-list.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductItemComponent } from './component/product-item/product-item.component';
import { PlanItemComponent } from './component/plan-item/plan-item.component';
import { PlanContentComponent } from './component/plan-content/plan-content.component';
import { PlanFormComponent } from './component/plan-form/plan-form.component';
import { NewProductComponent } from './page/new-product/new-product.component';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { PriceFormComponent } from './component/price-form/price-form.component';
import { DiscountFormComponent } from './component/discount-form/discount-form.component';
import { PlanPriceComponent } from './component/plan-price/plan-price.component';
import { PaywallHomeComponent } from './page/paywall-home/paywall-home.component';
import { PriceOffComponent } from './component/price-off/price-off.component';


@NgModule({
  declarations: [
    ProductContentComponent,
    ProductHomeComponent,
    ProductListComponent,
    BuilderComponent,
    PlanListComponent,
    ProductItemComponent,
    PlanItemComponent,
    PlanContentComponent,
    PlanFormComponent,
    NewProductComponent,
    ProductFormComponent,
    ProductDetailComponent,
    EditProductComponent,
    PriceFormComponent,
    DiscountFormComponent,
    PlanPriceComponent,
    PaywallHomeComponent,
    PriceOffComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
