import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppListComponent } from './page/app-list/app-list.component';
import { PersonalKeysComponent } from './page/personal-keys/personal-keys.component';
import { AppDetailComponent } from './page/app-detail/app-detail.component';

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
    component: AppDetailComponent,
  },
  {
    path: 'keys',
    component: PersonalKeysComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OauthRoutingModule { }
