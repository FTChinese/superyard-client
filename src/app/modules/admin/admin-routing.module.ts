import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminHomeComponent } from './page/admin-home/admin-home.component';
import { StaffHomeComponent } from './page/staff-home/staff-home.component';
import { UpdateUserComponent } from './page/update-user/update-user.component';
import { CreateUserComponent } from './page/create-user/create-user.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { StaffListComponent } from './components/staff-list/staff-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'staff',
    pathMatch: 'full',
  },
  {
    path: 'staff',
    component: StaffHomeComponent,
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
