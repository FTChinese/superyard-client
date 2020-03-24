import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { SearchStaffComponent } from './search-staff/search-staff.component';
import { SearchResultsComponent } from './search-results/search-results.component';


const routes: Routes = [
  {
    path: 'staff',
    component: SearchStaffComponent,
    children: [
      {
        path: '',
        component: StaffListComponent,
      },
      {
        path: 'search-results',
        component: SearchResultsComponent,
      },
    ]
  },
  {
    path: 'staff',
    component: AdminHomeComponent,
    children: [
      {
        path: 'new',
        component: CreateUserComponent,
      },
      {
        path: ':id',
        component: UpdateUserComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
