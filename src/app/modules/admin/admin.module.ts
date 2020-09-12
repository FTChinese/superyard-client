import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateUserComponent } from './page/create-user/create-user.component';
import { UpdateUserComponent } from './page/update-user/update-user.component';
import { StaffListComponent } from './page/staff-list/staff-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VipListComponent } from './page/vip-list/vip-list.component';

@NgModule({
  declarations: [
    StaffListComponent,
    CreateUserComponent,
    UpdateUserComponent,
    UserFormComponent,
    VipListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
