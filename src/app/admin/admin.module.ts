import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SharedModule } from '../shared/shared.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SearchStaffComponent } from './search-staff/search-staff.component';
import { SearchResultsComponent } from './search-results/search-results.component';


@NgModule({
  declarations: [StaffListComponent, AdminHomeComponent, CreateUserComponent, UpdateUserComponent, UserFormComponent, SearchStaffComponent, SearchResultsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
