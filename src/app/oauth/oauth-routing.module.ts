import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistryComponent } from './registry/registry.component';
import { NewAppComponent } from './new-app/new-app.component';
import { UpdateAppComponent } from './update-app/update-app.component';
import { KeyListComponent } from './key-list/key-list.component';
import { NewKeyComponent } from './new-key/new-key.component';
import { AppListComponent } from './app-list/app-list.component';

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
    path: 'apps/new',
    component: NewAppComponent,
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
