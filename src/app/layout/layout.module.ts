import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ContentLayoutComponent } from './content-layout/content-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { JumboLayoutComponent } from './jumbo-layout/jumbo-layout.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ContentLayoutComponent,
    JumboLayoutComponent,
    AuthLayoutComponent,
    NavComponent,
    PageNotFoundComponent,
    ToolbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    ToolbarComponent,
    FooterComponent,
  ]
})
export class LayoutModule { }
