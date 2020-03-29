import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashComponent } from './flash/flash.component';
import { FeedbackInvalidComponent } from './feedback-invalid/feedback-invalid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkedPipe } from './marked.pipe';
import { SearchComponent } from './search/search.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    FlashComponent,
    FeedbackInvalidComponent,
    MarkedPipe,
    SearchComponent,
    ToastComponent,
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
    ToastComponent,
    FeedbackInvalidComponent,
    MarkedPipe,
    SearchComponent,
  ]
})
export class SharedModule { }
