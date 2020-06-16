import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppListComponent } from './component/app-list/app-list.component';
import { AndroidHomeComponent } from './page/android-home/android-home.component';
import { CreateReleaseComponent } from './page/create-release/create-release.component';
import { UpdateReleaseComponent } from './page/update-release/update-release.component';


const routes: Routes = [
  {
    path: '',
    component: AndroidHomeComponent,
    children: [
      {
        path: '',
        component: AppListComponent,
      },
      {
        path: 'releases/:tag',
        component: UpdateReleaseComponent,
      }
    ]
  },
  {
    path: 'new',
    component: CreateReleaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AndroidRoutingModule { }
