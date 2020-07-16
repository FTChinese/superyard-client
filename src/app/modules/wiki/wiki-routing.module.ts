import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WikiListComponent } from './page/wiki-list/wiki-list.component';
import { NewArticleComponent } from './page/new-article/new-article.component';
import { EditArticleComponent } from './page/edit-article/edit-article.component';

const routes: Routes = [
  {
    path: '',
    component: WikiListComponent
  },
  {
    path: 'new',
    component: NewArticleComponent
  },
  {
    path: ':id',
    component: EditArticleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WikiRoutingModule { }
