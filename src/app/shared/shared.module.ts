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
import { OrderKindPipe } from './pipes/order-kind.pipe';
import { PayMethodPipe } from './pipes/pay-method.pipe';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalCancelComponent } from './modal-cancel/modal-cancel.component';
import { MenuComponent } from './menu/menu.component';
import { ProgressBtnComponent } from './progress-btn/progress-btn.component';
import { DynamicGroupComponent } from './dynamic-group/dynamic-group.component';

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
    OrderKindPipe,
    PayMethodPipe,
    ModalHeaderComponent,
    ModalCancelComponent,
    MenuComponent,
    ProgressBtnComponent,
    DynamicGroupComponent,
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
    OrderKindPipe,
    PayMethodPipe,
    SearchFormComponent,
    DynamicFormComponent,
    DynamicControlComponent,
    ProgressBtnComponent,
    ToastComponent,
    ControlFeedbackComponent,
    DropdownComponent,
    MenuComponent,
    ModalHeaderComponent,
    ModalCancelComponent,
  ]
})
export class SharedModule { }
