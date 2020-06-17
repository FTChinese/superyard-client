import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './core/service/auth.service';
import { httpInterceptorProviders } from './http-interceptors';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    LayoutModule,
    AppRoutingModule,
  ],
  providers: [
    AuthService,
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
