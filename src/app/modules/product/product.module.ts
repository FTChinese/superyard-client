import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductHomeComponent } from './page/product-home/product-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlanFormComponent } from './component/plan-form/plan-form.component';
import { NewProductComponent } from './page/new-product/new-product.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { PriceFormComponent } from './component/price-form/price-form.component';
import { DiscountFormComponent } from './component/discount-form/discount-form.component';
import { PlanPriceComponent } from './component/plan-price/plan-price.component';
import { PaywallHomeComponent } from './page/paywall-home/paywall-home.component';
import { PriceOffComponent } from './component/price-off/price-off.component';
import { NewBannerComponent } from './page/new-banner/new-banner.component';
import { NewPromoComponent } from './page/new-promo/new-promo.component';
import { EditBannerComponent } from './page/edit-banner/edit-banner.component';


@NgModule({
  declarations: [
    ProductHomeComponent,
    PlanFormComponent,
    NewProductComponent,
    ProductDetailComponent,
    EditProductComponent,
    PriceFormComponent,
    DiscountFormComponent,
    PlanPriceComponent,
    PaywallHomeComponent,
    PriceOffComponent,
    NewBannerComponent,
    NewPromoComponent,
    EditBannerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
