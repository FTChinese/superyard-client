import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistryComponent } from './registry/registry.component';
import { NewAppComponent } from './new-app/new-app.component';
import { UpdateAppComponent } from './update-app/update-app.component';
import { TokenListComponent } from './token-list/token-list.component';
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
    component: RegistryComponent,
    children: [
      {
        path: '',
        component: AppListComponent,
      },
      {
        path: 'new',
        component: NewAppComponent,
      },
      {
        path: ':clientId',
        component: UpdateAppComponent,
      },
      {
        path: ':clientId/tokens',
        component: TokenListComponent,
      }
    ]
  },
  {
    path: 'keys',
    component: RegistryComponent,
    children: [
      {
        path: '',
        component: KeyListComponent,
      },
      {
        path: 'new',
        component: NewKeyComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OauthRoutingModule { }
