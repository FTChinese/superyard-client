import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductHomeComponent } from './page/product-home/product-home.component';
import { ProductListComponent } from './page/product-list/product-list.component';
import { ProductUpdateComponent } from './page/product-update/product-update.component';

const routes: Routes = [
  {
    path: '',
    component: ProductHomeComponent,
  },
  {
    path: 'list',
    component: ProductListComponent,
  },
  {
    path: 'list/:id',
    component: ProductUpdateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
