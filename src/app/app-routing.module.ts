import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AuthGuard } from './core/guard/auth.guard';
import { sitemap } from './layout/sitemap';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: sitemap.settings,
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule),
      },
      {
        path: sitemap.admin,
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
      },
      {
        path: sitemap.oauth,
        loadChildren: () => import('./modules/oauth/oauth.module').then(m => m.OauthModule),
      },
      {
        path: sitemap.readers,
        loadChildren: () => import('./modules/reader/reader.module').then(m => m.ReaderModule),
      },
      {
        path: sitemap.android,
        loadChildren: () => import('./modules/android/android.module').then(m => m.AndroidModule),
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
      },
    ]
  },
  // {
  //   path: '**',
  //   component: PageNotFoundComponent
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        enableTracing: true
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
