import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from './layout/footer/footer.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClient,
    LayoutModule,
    AppRoutingModule,
    FooterComponent,
    ToolbarComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
