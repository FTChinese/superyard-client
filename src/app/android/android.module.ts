import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AndroidRoutingModule } from './android-routing.module';
import { AppListComponent } from './app-list/app-list.component';
import { EditReleaseComponent } from './edit-release/edit-release.component';
import { AndroidHomeComponent } from './android-home/android-home.component';
import { SharedModule } from '../shared/shared.module';
import { CreateReleaseComponent } from './create-release/create-release.component';
import { UpdateReleaseComponent } from './update-release/update-release.component';


@NgModule({
  declarations: [
    AppListComponent,
    EditReleaseComponent,
    AndroidHomeComponent,
    CreateReleaseComponent,
    UpdateReleaseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AndroidRoutingModule,
  ]
})
export class AndroidModule { }
