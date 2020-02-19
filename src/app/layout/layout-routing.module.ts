import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CenterLayoutComponent } from './center-layout/center-layout.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../auth/auth.guard';
import { MainLayoutComponent } from './main-layout/main-layout.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
    ]
  },
  {
    path: '',
    component: CenterLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
      }
    ]
  },
  {
    path: '',
    component: CenterLayoutComponent,
    children: [
      {
        path: 'forgot-password',
        loadChildren: () => import('../forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'readers',
        loadChildren: () => import('../reader/reader.module').then(m => m.ReaderModule),
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
