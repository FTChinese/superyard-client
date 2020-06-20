import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './component/product/product.component';
import { PlanComponent } from './component/plan/plan.component';
import { ProductHomeComponent } from './page/product-home/product-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { ProductContentComponent } from './component/product-content/product-content.component';
import { ProductUpdateComponent } from './page/product-update/product-update.component';
import { ProductListComponent } from './page/product-list/product-list.component';
import { PlanFormComponent } from './component/plan-form/plan-form.component';
import { B2bFormComponent } from './component/b2b-form/b2b-form.component';
import { RetailFormComponent } from './component/retail-form/retail-form.component';


@NgModule({
  declarations: [
    ProductComponent,
    PlanComponent,
    ProductHomeComponent,
    ProductFormComponent,
    ProductContentComponent,
    ProductUpdateComponent,
    ProductListComponent,
    PlanFormComponent,
    B2bFormComponent,
    RetailFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
