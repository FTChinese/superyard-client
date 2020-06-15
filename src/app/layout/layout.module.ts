import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ContentLayoutComponent } from './content-layout/content-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { JumboLayoutComponent } from './jumbo-layout/jumbo-layout.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';


@NgModule({
  declarations: [
    ContentLayoutComponent,
    PageNotFoundComponent,
    ToolbarComponent,
    ContentLayoutComponent,
    AuthLayoutComponent,
    JumboLayoutComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
  ],
  exports: [
    ToolbarComponent,
    FooterComponent,
  ]
})
export class LayoutModule { }
