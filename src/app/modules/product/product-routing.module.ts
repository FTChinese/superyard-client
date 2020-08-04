import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductHomeComponent } from './page/product-home/product-home.component';
import { BuilderComponent } from './page/builder/builder.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { PlanListComponent } from './component/plan-list/plan-list.component';
import { ManualComponent } from './component/manual/manual.component';
import { NewProductComponent } from './page/new-product/new-product.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductHomeComponent,
  },
  {
    path: 'new',
    component: NewProductComponent,
  },
  {
    path: ':id',
    component: ProductDetailComponent,
  },
  {
    path: ':id/edit',
    component: EditProductComponent,
  },
  {
    path: 'builder',
    component: BuilderComponent,
    children: [
      {
        path: '',
        component: ManualComponent,
      },
      {
        path: 'products',
        component: ProductListComponent,
      },
      {
        path: 'plans',
        component: PlanListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
