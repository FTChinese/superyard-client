import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductHomeComponent } from './page/product-home/product-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewProductComponent } from './page/new-product/new-product.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { PriceFormComponent } from './component/price-form/price-form.component';
import { DiscountFormComponent } from './component/discount-form/discount-form.component';
import { PlanPriceComponent } from './component/plan-price/plan-price.component';
import { PaywallHomeComponent } from './page/paywall-home/paywall-home.component';
import { PriceOffComponent } from './component/price-off/price-off.component';
import { NewPromoComponent } from './page/new-promo/new-promo.component';
import { EditBannerComponent } from './page/edit-banner/edit-banner.component';
import { BannerFormComponent } from './component/banner-form/banner-form.component';
import { BannerCardComponent } from './component/banner-card/banner-card.component';
import { PromoCardComponent } from './component/promo-card/promo-card.component';
import { BannerBoxComponent } from './component/banner-box/banner-box.component';
import { MetaListComponent } from './component/meta-list/meta-list.component';
import { BannerPreviewComponent } from './component/banner-preview/banner-preview.component';

@NgModule({
  declarations: [
    ProductHomeComponent,
    NewProductComponent,
    ProductDetailComponent,
    EditProductComponent,
    PriceFormComponent,
    DiscountFormComponent,
    PlanPriceComponent,
    PaywallHomeComponent,
    PriceOffComponent,
    NewPromoComponent,
    EditBannerComponent,
    BannerFormComponent,
    BannerCardComponent,
    PromoCardComponent,
    BannerBoxComponent,
    MetaListComponent,
    BannerPreviewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
