import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashComponent } from './flash/flash.component';
import { FeedbackInvalidComponent } from './feedback-invalid/feedback-invalid.component';
import { FlashDirective } from './flash.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutCenterComponent } from './layout-center/layout-center.component';

@NgModule({
  declarations: [
    FlashComponent,
    FlashDirective,
    FeedbackInvalidComponent,
    LayoutCenterComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlashComponent,
    FlashDirective,
    FeedbackInvalidComponent,
    LayoutCenterComponent,
  ]
})
export class SharedModule { }
