import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountService } from "./core/account.service";
import { TopBarComponent } from './top-bar/top-bar.component';
import { FlashComponent } from './flash/flash.component';
import { FeedbackInvalidComponent } from './feedback-invalid/feedback-invalid.component';
import { FlashDirective } from './core/flash.directive';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    FlashComponent,
    FeedbackInvalidComponent,
    FlashDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoginModule,
    AppRoutingModule,
  ],
  providers: [AccountService],
  bootstrap: [AppComponent],
  entryComponents: [
    FlashComponent,
  ]
})
export class AppModule { }
