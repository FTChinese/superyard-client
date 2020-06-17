import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkedPipe } from './pipes/marked.pipe';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicControlComponent } from './dynamic-control/dynamic-control.component';
import { AlertComponent } from './alert/alert.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    MarkedPipe,
    DynamicFormComponent,
    DynamicControlComponent,
    AlertComponent,
    SearchFormComponent,
    ToastComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
    MarkedPipe,
    SearchFormComponent,
    DynamicFormComponent,
    ToastComponent,
  ]
})
export class SharedModule { }
