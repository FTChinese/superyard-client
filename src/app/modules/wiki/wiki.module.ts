import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WikiRoutingModule } from './wiki-routing.module';
import { WikiListComponent } from './page/wiki-list/wiki-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [WikiListComponent],
  imports: [
    CommonModule,
    SharedModule,
    WikiRoutingModule
  ]
})
export class WikiModule { }
