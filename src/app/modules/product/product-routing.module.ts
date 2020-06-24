import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductHomeComponent } from './page/product-home/product-home.component';
import { BuilderComponent } from './page/builder/builder.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { PlanListComponent } from './component/plan-list/plan-list.component';
import { ManualComponent } from './component/manual/manual.component';
import { NewPlanComponent } from './page/new-plan/new-plan.component';
import { NewProductComponent } from './page/new-product/new-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductHomeComponent,
  },
  {
    path: 'builder/new-plan',
    component: NewPlanComponent,
  },
  {
    path: 'builder/new-desc',
    component: NewProductComponent,
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
