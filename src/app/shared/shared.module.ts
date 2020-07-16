import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkedPipe } from './pipes/marked.pipe';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicControlComponent } from './dynamic-control/dynamic-control.component';
import { AlertComponent } from './alert/alert.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ToastComponent } from './toast/toast.component';
import { CyclePipe } from './pipes/cycle.pipe';
import { TierPipe } from './pipes/tier.pipe';
import { ControlFeedbackComponent } from './control-feedback/control-feedback.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MarkedPipe,
    TierPipe,
    CyclePipe,
    DynamicFormComponent,
    DynamicControlComponent,
    AlertComponent,
    SearchFormComponent,
    ToastComponent,
    ControlFeedbackComponent,
    DropdownComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
    MarkedPipe,
    TierPipe,
    CyclePipe,
    SearchFormComponent,
    DynamicFormComponent,
    ToastComponent,
    ControlFeedbackComponent,
    DropdownComponent,
  ]
})
export class SharedModule { }
