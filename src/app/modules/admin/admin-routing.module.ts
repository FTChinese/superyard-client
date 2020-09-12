import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateUserComponent } from './page/update-user/update-user.component';
import { CreateUserComponent } from './page/create-user/create-user.component';
import { StaffListComponent } from './page/staff-list/staff-list.component';
import { VipListComponent } from './page/vip-list/vip-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'staff',
    pathMatch: 'full',
  },
  {
    path: 'staff',
    component: StaffListComponent,
  },
  {
    path: 'staff/new',
    component: CreateUserComponent,
  },
  {
    path: 'staff/:id',
    component: UpdateUserComponent,
  },
  {
    path: 'vip',
    component: VipListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
