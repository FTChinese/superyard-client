import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppListComponent } from './app-list/app-list.component';
import { AndroidHomeComponent } from './android-home/android-home.component';
import { CreateReleaseComponent } from './create-release/create-release.component';
import { UpdateReleaseComponent } from './update-release/update-release.component';


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
        path: 'new',
        component: CreateReleaseComponent,
      },
      {
        path: 'releases/:tag',
        component: UpdateReleaseComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AndroidRoutingModule { }
