import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './page/admin-home/admin-home.component';
import { StaffHomeComponent } from './page/staff-home/staff-home.component';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    StaffHomeComponent,
    AdminHomeComponent,
    StaffListComponent,
    SearchResultsComponent,
    CreateUserComponent,
    UpdateUserComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
