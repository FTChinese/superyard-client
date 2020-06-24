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
import { ManualComponent } from './component/manual/manual.component';
import { PlanFormComponent } from './component/plan-form/plan-form.component';


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
    ManualComponent,
    PlanFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
