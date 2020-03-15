import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { SearchStaffComponent } from './search-staff/search-staff.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminHomeComponent,
    children: [
      {
        path: 'search',
        component: SearchStaffComponent,
      },
      {
        path: 'staff/new',
        component: CreateUserComponent,
      },
      {
        path: 'staff/:id',
        component: UpdateUserComponent,
      }
    ]
  },
  {
    path: 'staff',
    component: StaffListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
