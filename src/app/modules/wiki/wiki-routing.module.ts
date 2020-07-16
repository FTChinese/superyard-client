import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WikiListComponent } from './page/wiki-list/wiki-list.component';

const routes: Routes = [
  {
    path: '',
    component: WikiListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WikiRoutingModule { }
