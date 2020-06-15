import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AndroidRoutingModule } from './android-routing.module';
import { AppListComponent } from './app-list/app-list.component';
import { EditReleaseComponent } from './edit-release/edit-release.component';
import { AndroidHomeComponent } from './android-home/android-home.component';
import { CreateReleaseComponent } from './create-release/create-release.component';
import { UpdateReleaseComponent } from './update-release/update-release.component';
import { SharedModule } from 'src/app/shared/shared.module';


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
