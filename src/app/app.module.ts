import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountService } from "./core/account.service";
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './login/login.component';
import { FlashComponent } from './flash/flash.component';
import { FeedbackInvalidComponent } from './feedback-invalid/feedback-invalid.component';
import { FlashDirective } from './core/flash.directive';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginComponent,
    FlashComponent,
    FeedbackInvalidComponent,
    FlashDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", component: LoginComponent },
    ]),
  ],
  providers: [AccountService],
  bootstrap: [AppComponent],
  entryComponents: [
    FlashComponent,
  ]
})
export class AppModule { }
