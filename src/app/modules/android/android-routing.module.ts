import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateReleaseComponent } from './page/create-release/create-release.component';
import { ReleaseListComponent } from './page/release-list/release-list.component';
import { UpdateReleaseComponent } from './page/update-release/update-release.component';


const routes: Routes = [
  {
    path: '',
    component: ReleaseListComponent,
  },
  {
    path: 'releases/:tag',
    component: UpdateReleaseComponent,
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
