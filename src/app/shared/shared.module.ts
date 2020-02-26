import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashComponent } from './flash/flash.component';
import { FeedbackInvalidComponent } from './feedback-invalid/feedback-invalid.component';
import { FlashDirective } from './flash.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkedPipe } from './marked.pipe';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    FlashComponent,
    FlashDirective,
    FeedbackInvalidComponent,
    MarkedPipe,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // FormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlashComponent,
    FlashDirective,
    FeedbackInvalidComponent,
    MarkedPipe,
    SearchComponent,
  ]
})
export class SharedModule { }
