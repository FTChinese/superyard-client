import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AndroidRoutingModule } from './android-routing.module';
import { CreateReleaseComponent } from './page/create-release/create-release.component';
import { UpdateReleaseComponent } from './page/update-release/update-release.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReleaseFormComponent } from './component/release-form/release-form.component';
import { ReleaseListComponent } from './page/release-list/release-list.component';


@NgModule({
  declarations: [
    CreateReleaseComponent,
    UpdateReleaseComponent,
    ReleaseFormComponent,
    ReleaseListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AndroidRoutingModule,
  ]
})
export class AndroidModule { }
