import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashComponent } from './flash/flash.component';
import { FeedbackInvalidComponent } from './feedback-invalid/feedback-invalid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkedPipe } from './pipes/marked.pipe';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicControlComponent } from './dynamic-control/dynamic-control.component';
import { AlertComponent } from './alert/alert.component';
import { SearchFormComponent } from './search-form/search-form.component';

@NgModule({
  declarations: [
    FlashComponent,
    FeedbackInvalidComponent,
    MarkedPipe,
    DynamicFormComponent,
    DynamicControlComponent,
    AlertComponent,
    SearchFormComponent,
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
    SearchFormComponent,
    DynamicFormComponent,
  ]
})
export class SharedModule { }
