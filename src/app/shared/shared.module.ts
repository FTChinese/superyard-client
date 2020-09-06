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
import { DropdownComponent } from './dropdown/dropdown.component';
import { RouterModule } from '@angular/router';
import { OrderKindPipe } from './pipes/order-kind.pipe';
import { PayMethodPipe } from './pipes/pay-method.pipe';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalCancelComponent } from './modal-cancel/modal-cancel.component';
import { MenuComponent } from './menu/menu.component';
import { ProgressBtnComponent } from './progress-btn/progress-btn.component';
import { DynamicGroupComponent } from './dynamic-group/dynamic-group.component';
import { LinePipe } from './pipes/line.pipe';
import { PropertyListComponent } from './property-list/property-list.component';

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
    DropdownComponent,
    OrderKindPipe,
    PayMethodPipe,
    ModalHeaderComponent,
    ModalCancelComponent,
    MenuComponent,
    ProgressBtnComponent,
    DynamicGroupComponent,
    LinePipe,
    PropertyListComponent,
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
    LinePipe,
    SearchFormComponent,
    DynamicFormComponent,
    DynamicControlComponent,
    ProgressBtnComponent,
    ToastComponent,
    DropdownComponent,
    MenuComponent,
    ModalHeaderComponent,
    ModalCancelComponent,
    PropertyListComponent,
  ]
})
export class SharedModule { }
