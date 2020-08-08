import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductHomeComponent } from './page/product-home/product-home.component';
import { NewProductComponent } from './page/new-product/new-product.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { PaywallHomeComponent } from './page/paywall-home/paywall-home.component';
import { EditBannerComponent } from './page/edit-banner/edit-banner.component';
import { NewPromoComponent } from './page/new-promo/new-promo.component';
import { BannerFormComponent } from './component/banner-form/banner-form.component';

const routes: Routes = [
  {
    path: '',
    component: PaywallHomeComponent,
  },
  {
    path: 'banner/new',
    component: BannerFormComponent,
  },
  {
    path: 'banner/edit',
    component: EditBannerComponent,
  },
  {
    path: 'promo',
    component: NewPromoComponent,
  },
  {
    path: 'products',
    component: ProductHomeComponent,
  },
  {
    path: 'products/new',
    component: NewProductComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'products/:id/edit',
    component: EditProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
