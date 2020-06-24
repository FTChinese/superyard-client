import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductHomeComponent } from './page/product-home/product-home.component';
import { BuilderComponent } from './page/builder/builder.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { PlanListComponent } from './component/plan-list/plan-list.component';
import { ManualComponent } from './component/manual/manual.component';
import { PlanFormComponent } from './component/plan-form/plan-form.component';

const routes: Routes = [
  {
    path: '',
    component: ProductHomeComponent,
  },
  {
    path: 'plans/new',
    component: PlanFormComponent,
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
