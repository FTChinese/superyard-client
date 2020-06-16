import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AndroidRoutingModule } from './android-routing.module';
import { AppListComponent } from './component/app-list/app-list.component';
import { AndroidHomeComponent } from './page/android-home/android-home.component';
import { CreateReleaseComponent } from './page/create-release/create-release.component';
import { UpdateReleaseComponent } from './page/update-release/update-release.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReleaseFormComponent } from './component/release-form/release-form.component';


@NgModule({
  declarations: [
    AppListComponent,
    AndroidHomeComponent,
    CreateReleaseComponent,
    UpdateReleaseComponent,
    ReleaseFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AndroidRoutingModule,
  ]
})
export class AndroidModule { }
