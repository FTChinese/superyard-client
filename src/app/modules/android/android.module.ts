import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AndroidRoutingModule } from './android-routing.module';
import { AppListComponent } from './component/app-list/app-list.component';
import { EditReleaseComponent } from './component/edit-release/edit-release.component';
import { AndroidHomeComponent } from './page/android-home/android-home.component';
import { CreateReleaseComponent } from './page/create-release/create-release.component';
import { UpdateReleaseComponent } from './page/update-release/update-release.component';
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
