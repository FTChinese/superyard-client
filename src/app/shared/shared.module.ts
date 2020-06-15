import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashComponent } from './flash/flash.component';
import { FeedbackInvalidComponent } from './feedback-invalid/feedback-invalid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkedPipe } from './pipes/marked.pipe';
import { SearchComponent } from './search/search.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicControlComponent } from './dynamic-control/dynamic-control.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    FlashComponent,
    FeedbackInvalidComponent,
    MarkedPipe,
    SearchComponent,
    DynamicFormComponent,
    DynamicControlComponent,
    AlertComponent,
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
    AlertComponent,
    FeedbackInvalidComponent,
    MarkedPipe,
    SearchComponent,
    DynamicFormComponent,
  ]
})
export class SharedModule { }
