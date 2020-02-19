import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReaderModule } from './reader/reader.module';

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
    ReaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    // FlashComponent,
  ]
})
export class AppModule { }
