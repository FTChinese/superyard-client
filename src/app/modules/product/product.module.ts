import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductHomeComponent } from './page/product-home/product-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductContentComponent } from './component/product-content/product-content.component';
import { B2bFormComponent } from './component/b2b-form/b2b-form.component';
import { RetailFormComponent } from './component/retail-form/retail-form.component';
import { BuilderComponent } from './page/builder/builder.component';
import { PlanListComponent } from './component/plan-list/plan-list.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductItemComponent } from './component/product-item/product-item.component';
import { PlanItemComponent } from './component/plan-item/plan-item.component';
import { PlanContentComponent } from './component/plan-content/plan-content.component';
import { ManualComponent } from './component/manual/manual.component';


@NgModule({
  declarations: [
    ProductContentComponent,
    ProductHomeComponent,
    ProductListComponent,
    B2bFormComponent,
    RetailFormComponent,
    BuilderComponent,
    PlanListComponent,
    ProductItemComponent,
    PlanItemComponent,
    PlanContentComponent,
    ManualComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
