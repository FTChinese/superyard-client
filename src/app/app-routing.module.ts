import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AuthGuard } from './core/guard/auth.guard';
import { siteBaseUrl } from './layout/sitemap';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { HomeComponent } from './modules/home/home.component';
import { SettingsModule } from './modules/settings/settings.module';
import { AdminModule } from './modules/admin/admin.module';
import { OauthModule } from './modules/oauth/oauth.module';
import { WikiModule } from './modules/wiki/wiki.module';
import { AndroidModule } from './modules/android/android.module';
import { ReaderModule } from './modules/reader/reader.module';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: siteBaseUrl.settings,
        // loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule),
        loadChildren: () => SettingsModule,
      },
      {
        path: siteBaseUrl.admin,
        // loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
        loadChildren: () => AdminModule,
      },
      {
        path: siteBaseUrl.oauth,
        // loadChildren: () => import('./modules/oauth/oauth.module').then(m => m.OauthModule),
        loadChildren: () => OauthModule,
      },
      {
        path: siteBaseUrl.wiki,
        // loadChildren: () => import('./modules/wiki/wiki.module').then(m => m.WikiModule),
        loadChildren: () => WikiModule,
      },
      {
        path: siteBaseUrl.android,
        // loadChildren: () => import('./modules/android/android.module').then(m => m.AndroidModule),
        loadChildren: () => AndroidModule,
      },
      {
        path: siteBaseUrl.readers,
        // loadChildren: () => import('./modules/reader/reader.module').then(m => m.ReaderModule),
        loadChildren: () => ReaderModule,
      },
      {
        path: 'products',
        // loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule),
        loadChildren: () => ProductModule,
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        // loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
        loadChildren: () => AuthModule,
      },
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
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
