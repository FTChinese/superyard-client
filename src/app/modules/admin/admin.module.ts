import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './page/admin-home/admin-home.component';
import { StaffHomeComponent } from './page/staff-home/staff-home.component';
import { CreateUserComponent } from './page/create-user/create-user.component';
import { UpdateUserComponent } from './page/update-user/update-user.component';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { UserFormComponent } from './components/user-form/user-form.component';
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
