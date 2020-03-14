import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { OauthModule } from './oauth/oauth.module';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    OauthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    // FlashComponent,
  ]
})
export class AppModule { }
