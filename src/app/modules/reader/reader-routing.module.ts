import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDetailComponent } from './page/account-detail/account-detail.component';
import { ReaderHomeComponent } from './page/reader-home/reader-home.component';
import { OrdersComponent } from './page/orders/orders.component';
import { SandboxComponent } from './page/sandbox/sandbox.component';
import { SandboxDetailComponent } from './page/sandbox-detail/sandbox-detail.component';
import { IapListComponent } from './component/iap-list/iap-list.component';
import { UnconfirmedComponent } from './page/unconfirmed/unconfirmed.component';
import { UnconfirmedListComponent } from './page/unconfirmed-list/unconfirmed-list.component';

const routes: Routes = [
  {
    path: '',
    component: ReaderHomeComponent,
  },
  {
    path: 'ftc/:id',
    component: AccountDetailComponent,
    data: { kind: 'ftc' },
  },
  {
    path: 'wechat/:id',
    component: AccountDetailComponent,
    data: { kind: 'wechat' },
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'wh-unconfirmed',
    component: UnconfirmedComponent,
    children: [
      {
        path: 'ali',
        component: UnconfirmedListComponent,
        data: { payMethod: 'alipay' }
      },
      {
        path: 'wx',
        component: UnconfirmedListComponent,
        data: { payMethod: 'wechat' }
      }
    ]
  },
  {
    path: 'sandbox',
    component: SandboxComponent,
  },
  {
    path: 'sandbox/:id',
    component: SandboxDetailComponent,
  },
  {
    path: 'iap',
    component: IapListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ReaderRoutingModule { }
