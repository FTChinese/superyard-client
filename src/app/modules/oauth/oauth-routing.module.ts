import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppListComponent } from './page/app-list/app-list.component';
import { UpdateAppComponent } from './page/update-app/update-app.component';
import { KeyListComponent } from './page/key-list/key-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'apps',
    pathMatch: 'full',
  },
  {
    path: 'apps',
    component: AppListComponent,
  },
  {
    path: 'apps/:clientId',
    component: UpdateAppComponent,
  },
  {
    path: 'keys',
    component: KeyListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OauthRoutingModule { }
